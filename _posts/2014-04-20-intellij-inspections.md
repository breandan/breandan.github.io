---
layout: post
title: Inspections, Instructions & Intentions 
---

IntelliJ IDEA offers a formidable [array of inspections](http://www.jetbrains.com/idea/documentation/inspections.jsp) (632 and counting), each thoughtfully crafted to help you deliver clean, bug-free code. One which recently caught my attention, [Suspicious Name Combination](http://www.jetbrains.com/idea/documentation/inspections/SuspiciousNameCombination.html), is an inspection that detects “suspicious” argument-parameter assignments in n-ary functions by analyzing lexical tokens in the method signature. This frequently occurs in dyads such as ```setSize(width, height)```, or triads like ```assertEquals(message, actual, expected)``` where the order of shared-type parameters can be easily confused and will often slip through static type-checks unnoticed. For example, IntelliJ will alert you when passing a variable named ```btnHeight``` into a parameter named ```width```.

![Wow. How smart. Such insight.](/images/suspiciousNameCombination.jpg)

If you think about it, this is a Non. Trivial. Inspection. Writing good inspections is a fairly delicate process to begin with due to the tradeoff between [sensitivity and specificity](http://en.wikipedia.org/wiki/Sensitivity_and_specificity). If an inspection is too specific, it will lack adequate coverage - if it is too general, then you’ll end up supporting a bunch of [exceptions](http://youtrack.jetbrains.com/issue/IDEA-117814) to handle the [edge cases](http://youtrack.jetbrains.com/issue/IDEA-72145). In many ways, this is the same dilemma faced by diagnostic tests for cancer and other medical conditions. Taking the analogy a bit further, if software is the patient, bugs are the cancer and inspections are the diagnostics. So how exactly does IntelliJ Suspicion work? It’s either very ad-hoc or very clever. Let’s go to the [source](http://git.jetbrains.org/?p=idea/community.git;a=blob_plain;f=java/java-analysis-impl/src/com/intellij/codeInspection/suspiciousNameCombination/SuspiciousNameCombinationInspectionBase.java;h=e12f10cdbc53198f6e6c44da096aae78dcbe89c8;hb=15777aa6ca7cbe239dec62d255b9735a44ef25a3) for a closer look. The first thing we notice is that identifiers are grouped by similarity into so-called name groups.

{% highlight java %}

 protected final List<String> myNameGroups = new ArrayList<String>();
 private final Map<String, String> myWordToGroupMap = new HashMap<String, String>();

 public SuspiciousNameCombinationInspectionBase() {
    addNameGroup("x,width,left,right");
    addNameGroup("y,height,top,bottom");
  }

 protected void addNameGroup(@NonNls final String group) {
    myNameGroups.add(group);
    List<String> words = StringUtil.split(group, ",");
    for(String word: words) {
      myWordToGroupMap.put(word.trim().toLowerCase(), group);
    }
  }

{% endhighlight %}

It looks like they’re constructing a data structure to detect set membership or something. Let’s go a little further. There are three areas of suspicion: at the assignment, call site, and [return statement](http://devnet.jetbrains.com/message/5228648#5228648) (nice). We’ll focus on the call site, since that’s the most general case.

{% highlight java %}

@Override public void visitCallExpression(PsiCallExpression expression) {
      final PsiMethod psiMethod = expression.resolveMethod();
      final PsiExpressionList argList = expression.getArgumentList();
      if (psiMethod != null && argList != null) {
        final PsiExpression[] args = argList.getExpressions();
        final PsiParameter[] parameters = psiMethod.getParameterList().getParameters();
        for(int i=0; i<parameters.length; i++) {
          if (i >= args.length) break;
          if (args [i] instanceof PsiReferenceExpression) {
            // PsiParameter.getName() can be expensive for compiled class files, so check reference name before
            // fetching parameter name
            final String refName = ((PsiReferenceExpression)args[i]).getReferenceName();
            if (findNameGroup(refName) != null) {
              checkCombination(args [i], parameters [i].getName(), refName, "suspicious.name.parameter");
            }
          }
        }
      }
    }
{% endhighlight %}

Forget about what a PSI is for now (it’s something like XPath for ASTs with built-in reflection, you can almost get a feel for it here), this method basically iterates through an argument list. If the argument in question belongs to an existing name group, then it matches that argument name ```refName``` to its respective parameter’s name ```parameters[i].getName()```, from the method signature and performs some sort of check.

{% highlight java %}
private void checkCombination(final PsiElement location,
                                  @Nullable final String name,
                                  @Nullable final String referenceName,
                                  final String key) {
      String nameGroup1 = findNameGroup(name);
      String nameGroup2 = findNameGroup(referenceName);
      if (nameGroup1 != null && nameGroup2 != null && !nameGroup1.equals(nameGroup2)) {
        myProblemsHolder.registerProblem(location, JavaErrorMessages.message(key, referenceName, name));
      }
    }
{% endhighlight %}

Now if the parameter’s name group ```findNameGroup(name)``` doesn’t match the argument’s name group ```findNameGroup(referenceName)``` then we have a problem. There is a semantic contradiction. So far we're just peeling back the implementation layers. The heart of our algorithm lies in ```findNameGroup(String name)```. Let’s take a look.

{% highlight java %}

@Nullable private String findNameGroup(@Nullable final String name) {
      if (name == null) {
        return null;
      }
      String[] words = NameUtil.splitNameIntoWords(name);
      String result = null;
      for(String word: words) {
        String group = myWordToGroupMap.get(word.toLowerCase());
        if (group != null) {
          if (result == null) {
            result = group;
          }
          else if (!result.equals(group)) {
            result = null;
            break;
          }
        }
      }
      return result;
    }
{% endhighlight %}

Tokenize and scan the name for salient keywords, with a [sentinel value](http://en.wikipedia.org/wiki/Sentinel_value): an inconsistent group. Here's the catch. Not immediately obvious here, but it’s a precaution against false positives! Someone was worried about ambiguous names like ```bottomRight``` being flagged for suspicion. If and only if ```name``` belongs to exactly one name group then return that group, otherwise return ```null```.

All things considered, it is a very modest heuristic, accomplishing just what it sets out to do. If it were any more ambitious it might attempt to solve a longest common substring against neighboring parameter name groups, and it might also fail twice as often. The truth is difficult to escape: there is no sure substitute for writing clean code. IntelliJ will catch a limited subset of specific name substitutions, but will not prevent a misplaced argument in an arbitrary function with consecutive, order-dependent, shared-type parameters. Until telepathic connectivity is fully supported, best favor monadic functions, use the builder pattern, and name variables intelligibly.

Further Reading

Martin, Robert C. (2009) "Clean Code, A Handbook of Agile Software Craftsmanship." Chapter 3, pp. 40-43. Function Arguments.

[IntelliJ IDEA Architectural Overview - PSI Elements](http://confluence.jetbrains.com/display/IDEADEV/IntelliJ+IDEA+Architectural+Overview#IntelliJIDEAArchitecturalOverview-PsiElements)
