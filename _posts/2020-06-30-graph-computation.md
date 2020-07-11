---
layout: post
title: Computation graphs and graph computation

---

A carefully edited anthology in which I vindicate my illustrious career as a hype-chasing Hacker News junkie, AI astrologer, and Twitter fortune-teller, while debunking my imaginary critics in the peanut gallery. I also extol the virtues of graphs, algebra, types, and how these concepts can help us think about software. Finally, I share my predictions for the path ahead, which I consider to be the start of an exciting new chapter in computing history.

TLDR: Research has shown a great many algorithms can be expressed as matrix multiplication, suggesting an unrealized connection between linear algebra and computer science. I speculate graphs are the missing piece of the puzzle. Graphs are not only useful as cognitive aides, but are suitable data structures for a wide variety of tasks, particularly on modern parallel processing architectures. Finally, I propose a computational primitive based on matrix multiplication, bridging graphs and computation.

*n.b.: None of these ideas are mine. Shoulders of giants. Use landscape mode for optimal reading experience.*

# New decade, new delusions

Over the last decade, I bet on some strange ideas. A lot of people I looked up to at the time laughed at me. I'll bet they aren't laughing anymore. I ought to thank them one day, because their laughter gave me a lot of motivation. I've said some idiotic things to be sure, but I've also made some laughable predictions which were correct. Lesson learned: aim straighter.

In 2012, I was in Austin sitting next to an ex-poker player named [Amir](https://twitter.com/amirpc) who was singing Hinton's praises. Hypnotized by his technicolor slides, I quit my job in a hurry and started an educational project using speech recognition and restricted Boltzmann machines. It never panned out, but I learned a lot about ASR and Android audio. Still love [that idea](http://breandan.net/2014/02/09/the-end-of-illiteracy/).

<center>
<a href="https://www.cs.toronto.edu/~hinton/csc2535/notes/lec4new.pdf"><img align="center" width="75%" src="../images/rbm.png"/></a>
</center>

In 2016, I quit my next job as a tech evangelist to [run around the world](http://breandan.net/2016/12/27/traveling-tales/) giving incoherent talks about deep learning. Met Yoshua at the United Nations and decided to study in Canada. I applied to UofT and UdeM. Ended up at UdeM because I hate asking for recommendations, and they were the only ones who didn't care about them anyway. Best decision I ever made. Move to Montréal, thank me later.

In 2017, I started writing a book on the ethics of automation and [predicted](http://breandan.net/2017/02/02/trust-in-automation/) mass unemployment and social unrest. Although I got the causes wrong (pandemic, go figure), the information economy and bias takes were all dead right. Sadly, this is now driving the world completely insane. Don't say I warned you, go out and fix our broken systems. The world needs more engineers who care.

<center>
<a href="https://colah.github.io/posts/2015-09-NN-Types-FP/"><img align="center" width="75%" src="../images/diff_prog.png"/></a>
</center>

In 2017, I witnessed the birth of differentiable programming, which I stole from Chris Olah and turned into a [master's thesis](https://github.com/breandan/kotlingrad/blob/master/latex/thesis/thesis.pdf). Had a lot of trouble convincing people that programs could be made differentiable, but look at the proceedings of any machine learning conference today and you'll find dozens of papers on differentiable sorting and rendering and simulation. Don't thank me, thank Chris and the Theano guys.

In 2018, I correctly predicted Microsoft would acquire GitHub to mine code. Why MS and not Google? I'll bet they tried, but Google's leadership had fantasies of AGI and besides JetBrains, MS were the only ones who gave a damn about developers. Now ML4SE is a thriving [research area](https://ml4se.github.io/) and showing up in [real](https://github.com/JetBrains-Research/DeepBugsPlugin) [products](https://devblogs.microsoft.com/visualstudio/ai-assisted-intellisense-for-your-teams-codebase/), much to the chagrin of those who believed ML was a fad. I suspect their hype filter blinded them to the value those tools provide.

<center>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Prediction: MS will acquire GH within five years. If the <a href="https://twitter.com/hashtag/ML4Code?src=hash&amp;ref_src=twsrc%5Etfw">#ML4Code</a> stuff delivers for MS, acquisition is highly likely. Although it would have been cheaper a few years ago. <a href="https://t.co/5ZMtiRtifD">https://t.co/5ZMtiRtifD</a> <a href="https://t.co/TaxkArm5ps">https://t.co/TaxkArm5ps</a></p>&mdash; breandan (@breandan) <a href="https://twitter.com/breandan/status/993553301927936001?ref_src=twsrc%5Etfw">May 7, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<a href="https://blogs.microsoft.com/blog/2018/10/26/microsoft-completes-github-acquisition/">
<img align="center" width="75%" src="../images/microsoft_github_aquisition.png"/></a>
</center>

But to heck with everything I've said! If I had just one idea to share with these ML people, it would be types. Beat that drum as loud as I could. Types are the best tool we know for synthetic reasoning. If you want to build provably correct systems that scale on real-world applications, types are the answer. Not everyone is convinced yet, but mark my words, [types](https://github.com/tensorflow/tensorflow/issues/12345) are [coming](https://docs.python.org/3.9/whatsnew/3.9.html#pep-585-builtin-generic-types). Whoever figures out how to connect types and learning will be the next Barbara Liskov or Frances Allen.

This year, I predicted the pandemic weeks before the lockdown, exited the market, and turned down a job at Google. Some people called me crazy. Now I'm going all-in on some new ideas (none of which are mine). I'm making some big bets and some will be wrong, but I see the very same spark of genius in them. Hang on to your hats, because if I'm right, these ideas are going to shake the foundations of modern computing.

# Everything old is new again

As a kid, I was given a book on the history of mathematics. I remember it had some interesting puzzles, including one with [some bridges](https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg) in a town divided by rivers, once inhabited by a man called Euler. Was there a tour crossing each bridge exactly once? Was it possible to tell without checking every path? I remember spending days trying to figure out the answer.

<center>
<a href="https://en.wikipedia.org/wiki/Seven_Bridges_of_K%C3%B6nigsberg"><img align="center" width="60%" src="../images/konigsberg_bridges.png"/></a>
</center>

In the late 90s, my mom and I went to Ireland. I remember visiting Trinity College, and learning about a mathematician called [Hamilton](https://en.wikipedia.org/wiki/William_Rowan_Hamilton) who discovered a famous formula connecting algebra and geometry, and carved it onto a [bridge](https://en.wikipedia.org/wiki/Broom_Bridge). We later visited the bridge, and the tour guide pointed out the stone, which we touched for good luck. The Irish have a [thing](https://en.wikipedia.org/wiki/Poulnabrone_dolmen) for [stones](https://en.wikipedia.org/wiki/Newgrange).

<center>
<a href="http://www.kurims.kyoto-u.ac.jp/EMIS/classics/Hamilton/PRIAIcos.pdf"><img align="center" width="40%" src="../images/quaternions.jpg"/></a>
</center>

In 2007, I was applying to college and took the train from Boston to South Bend, Indiana, home of the Fighting Irish. Wandering about, I picked up a magazine article by a Hungarian mathematician called [Barabási](https://en.wikipedia.org/wiki/Albert-L%C3%A1szl%C3%B3_Barab%C3%A1si) then at Notre Dame, who had some interesting things to say about [complex networks](https://en.wikipedia.org/wiki/Complex_network). Later in 2009, while studying in Rochester, I [carpooled](../images/complex_network_seminar.png) with a [nice professor](https://avesis.medeniyet.edu.tr/hasan.guclu), and learned complex networks are found in brains, languages and many marvelous places.

<center>
<a href="https://barabasi.com/f/226.pdf"><img align="center" width="75%" src="../images/complex_networks.png"/></a>
</center>

Fast forward to 2017. I was lured by the siren song of algorithmic differentiation. Olivier Breleux presented [Myia](https://github.com/mila-iqia/myia) and [Buche](https://github.com/breuleux/buche). Matt Johnson gave a talk on [Autograd](https://github.com/HIPS/autograd). I met Chris Olah in Long Beach, who gave me the idea to study [differentiable programming](https://colah.github.io/posts/2015-09-NN-Types-FP/). I stole his idea, dressed it up in Kotlin and traded it for a POPL workshop paper and later a [Master's thesis](https://github.com/breandan/kotlingrad/blob/master/latex/thesis/thesis.pdf). Our contributions were using algebra, shape inference and presenting AD as term rewriting.

<center>
<a href="https://github.com/breandan/kotlingrad#dataflow-graphs"><img align="center" width="75%" src="https://github.com/breandan/kotlingrad/raw/master/samples/src/main/resources/dataflow.svg"/></a>
</center>

In 2019, I joined a lab with a [nice professor](https://www.cs.mcgill.ca/~jguo/) at McGill applying knowledge graphs to software engineering. Like logical reasoning, knowledge graphs are an idea from the first wave of AI in the 1960s and 70s which have been revived and studied in light of recent progress in the field. I believe this is an important area of research with a lot of potential. Knowledge and traceability plays an important role in software engineering, and it's the bread-and-butter of a good IDE. The world needs better IDEs if we're ever going to untangle this mess we're in.

<center>
<a href="https://structurizr.com/"><img align="center" width="45%" src="https://raw.githubusercontent.com/cecuesta/structurizr-java/master/docs/images/graphviz-spring-petclinic-components.png"/></a>
</center>

This Spring, I took a fascinating [seminar on Graph Representation Learning](https://cs.mcgill.ca/~wlh/comp766/index.html). A lot of delightful graph theory had been worked out over the preceding decade. [PageRank](https://en.wikipedia.org/wiki/PageRank) turned into power iteration. People made lots of interesting connections to linear algebra, including Weisfeiler-Lehman graph kernels, graph Laplacians, Krylov methods, and spectral graph theory. There are some elegant mathematics for representing graphs, and choosing the right representation can be very powerful. More on that later.

# What are graphs?

Graphs are general-purpose data structures used to represent a variety of data types and procedural phenomena. Unlike most sequential languages, graphs are capable of expressing a much richer family of relations between entities. Consider the following hierarchy of data structures, all of which are graphs with increasing expressive power:

- **Sets**: datasets, multisets, posets, alphabets
- **Sequences**: Lists, strings, arrays, linear function composition
- **Trees**: [Abstract syntax](https://en.wikipedia.org/wiki/Abstract_syntax_tree), [XML](https://en.wikipedia.org/wiki/Document_Object_Model), [phylogeny](https://en.wikipedia.org/wiki/Phylogenetic_tree), [decision trees](https://en.wikipedia.org/wiki/Decision_tree)
- **DAGs**: [Git](https://eagain.net/articles/git-for-computer-scientists/), [citations](https://en.wikipedia.org/wiki/Citation_network), [dependency graphs](https://en.wikipedia.org/wiki/Dependency_graph), [workflows](https://en.wikipedia.org/wiki/Workflow_management_system), [control flow](https://en.wikipedia.org/wiki/Control-flow_graph), [MLPs](https://en.wikipedia.org/wiki/Multilayer_perceptron)
- **Directed graphs**: [State machines](https://en.wikipedia.org/wiki/Finite-state_machine), [λ-calculus](http://dkeenan.com/Lambda/), [the web](https://computersciencewiki.org/index.php/The_web_as_a_directed_graph), [call graphs](https://en.wikipedia.org/wiki/Call_graph), [RNNs](https://en.wikipedia.org/wiki/Recurrent_neural_network)
- **Hypergraphs**: [Knowledge](https://arxiv.org/pdf/2003.02320.pdf), [Zettelkasten](https://zettelkasten.de/), [categories](https://en.wikipedia.org/wiki/Category_theory), [physics](https://writings.stephenwolfram.com/2020/04/finally-we-may-have-a-path-to-the-fundamental-theory-of-physics-and-its-beautiful/), [hypernetworks](https://openreview.net/pdf?id=rkpACe1lx)

Directed graphs can be used to model mathematical expressions as I show in [Kotlin∇](https://github.com/breandan/kotlingrad), as well as other formal languages, including source code, intermediate representations and markup. There are many recent examples of learning directed graphs for neuro-symbolic applications:

* [Learning to Represent Programs with Graphs](https://arxiv.org/pdf/1711.00740.pdf), Allamanis et al., 2018
* [Deep Learning for Symbolic Mathematics](https://arxiv.org/pdf/1912.01412.pdf), Lample and Charton, 2019.
* [Discovering Symbolic Models from Deep Learning with Inductive Biases](https://arxiv.org/pdf/2006.11287.pdf), Cranmer et al., 2020.
* [Symbolic Pregression: Discovering Physical Laws from Raw Distorted Video](https://arxiv.org/pdf/2005.11212.pdf) (Udrescu & Tegmark, 2020).
* [DreamCoder: Growing generalizable, interpretable knowledge with wake-sleep Bayesian program learning](https://arxiv.org/pdf/2006.08381.pdf), Ellis et al., 2020.
* [Strong Generalization and Efficiency in Neural Programs](https://arxiv.org/abs/2007.03629), Li et al., 2020.

The field of natural language has also developed a rich set of graph-based representations, such as [constituency](https://en.wikipedia.org/wiki/Phrase_structure_grammar), [dependency](https://en.wikipedia.org/wiki/Dependency_grammar), [link](https://en.wikipedia.org/wiki/Link_grammar) and other and other typed attribute grammars which can be used to reason about syntactic and semantic relations between natural language entities. Research has begun to show many practical applications for such grammars in the extraction and organization of human knowledge stored in large text corpora. Those graphs can be further processed into ontological representations for logical reasoning.

<center>
<img align="center" width="60%" src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Thistreeisillustratingtherelation%28PSG%29.png"/>
</center>

Using coreference resolution and entity alignment techniques, we can reconstruct internally consistent relations between entities, reflecting cross-corpus consensus in natural language datasets. These relationships can be stored in [knowledge graphs](https://arxiv.org/pdf/2003.02320.pdf), and used for information retrieval and question answering, e.g. on wikis and other content management systems. Recent techniques have shown promise in automatic knowledge base construction (cf. [Reddy et al.](https://www.mitpressjournals.org/doi/pdf/10.1162/tacl_a_00088), 2016).

<!--![logical_forms](../images/logical_forms.png) -->
<center>
<a href="https://arxiv.org/pdf/2003.02320.pdf"><img align="center" width="75%" src="../images/knowledge_graph.png"/></a>
</center>

Lo and behold, the key idea behind knowledge graphs is our old friend, types. Knowledge graphs are multi-relational graphs whose nodes and edges possess a type. Two entities can be related by multiple types, and each type can relate many pairs of entities. We can index an entity based on its type for knowledge retrieval, and use types to reason about compound queries, e.g. "Which `company` has a direct `flight` from a `port city` to a `capital city`?", which would otherwise be difficult to model explicitly without a type system.

# Induction introduction!

In this section, we will review some important concepts from [Chomskyan linguistics](https://en.wikipedia.org/wiki/Chomsky_hierarchy), including structural induction, string rewrite systems, λ-calculus and cellular automata. We will see how each has an interesting connection to graphs. If you are already familiar with these ideas, feel free to skim them or skip to the next section.

## [Regular languages](#regular-languages)

One thing that always fascinated me is the idea of inductively defined languages, also known as recursive, or structural induction. Consider a very simple language which accepts strings of the form `0`, `1`, `100`, `101`, `1001`, `1010`, et cetera, but rejects `011`, `110`, `1011`, or any string containing `11`. The `→` symbol indicates a "production". The `|` symbol, which we read as "or", is just a shorthand for defining multiple productions on a single line:

```
true → 1
term → 0 | 10 | ε
expr → term | expr term
```

We have two sets of productions, those which can be expanded, called "nonterminals", and those which can be expanded no further, called "terminals". Notice how each non-terminal occurs at most once in any single production. This property guarantees the language is recognizable by a special kind of graph, called a finite state machine. As their name suggests, FSMs contain a finite set of states, with labeled transitions between them:

|Finite Automaton | Library Courtesy Bell |
|:------:|:------:|
|<center><img align="center" width="200%" src="../images/fsm_bell.svg"/></center>| <br/><center><img align="center" width="50%" src="../images/bell.png"/></center><br/>Please ring the bell **once**<br/> and wait for assistance. |

Imagine a library desk: you can wait quietly and eventually you will be served. You can ring the bell once, and wait quietly to be served. Should no one arrive after some time, you may press the bell again and continue waiting. Though you must never ring the bell twice, lest you disturb the patrons and be tossed out.

Regular languages can also model nested repetition. Consider a slightly more complicated language, given by the regular expression `(0(01)*)*(10)*`. The `*`, or Kleene star,  means, "accept zero or more of the previous token".

<table>
<tr>
<td> <center><b>Backus-Naur Grammar</b></center> </td> <td><center><b><center>Nondeterminstic Finite Automaton</center></b></center></td>
</tr>
<tr>

<td>
<div markdown="1">
```

   t → ε | 0
   a → 10 | a 10
   b → 0 | b 01 | b 0 ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎

```
</div>
</td>
<td>
<div markdown="1">
<center><img src="../images/nfa.svg" width="80%"/></center>
</div>
</td>
</tr>
</table>

Note here, a single state may have multiple transitions on the same symbol. Called a nondeterminsic finite automata (NFA), this machine can occupy multiple states simulatneously. While no more powerful than their determinstic cousins, NFAs often requires far fewer states to recognize the same language. One way to implement an NFA is to simulate the superposition of all states, by cloning the machine whenever such a transition occurs. More on that later.

## Arithmetic

Now suppose we have a slightly more expressive language which accepts well-formed arithmetic expressions with up to two variables, in either infix or unary prefix form. In this language, a non-terminal may occur twice inside a single production -- an `expr` can be composed of two sub`expr`s:

```
term → 1 | 0 | x | y
  op → + | - | ·
expr → term | op expr | expr op expr
```

This is known as a context-free language (CFL). We can represent strings in this language using a special kind of graph, called a syntax tree. Each time we expand an `expr` with a production rule, this generates a rooted subtree on `op`, whose branch(es) are `expr`s. Typically, syntax trees are inverted, with branches extending downwards, like so:

|Syntax Tree| Peach Tree|
|:---:|:---:|
|<center><img align="center" width="80%" src="../images/tree_syntax.svg"/></center>|<center><img align="center" width="75%" src="../images/tree_peach.png"/></center>|

While syntax trees can be interpreted computationally, they do not actually perform computation unless evaluated. To (partially) evaluate a syntax tree, we will now to introduce some pattern matching rules. Instead of just allowing terminals to occur on the right-hand side of a production, suppose we also allow terminals on the left, and applying a rule can shrink a string in our language. Here, we use capital letters on the same line to indicate an exact match, e.g. a rule `U + V → V + U` would replace `x + y` with `y + x`:

```
                                         E + E → +E
                                         E · E → ·E
                  E + 1 | 1 + E | +1 | -0 | ·1 → 1
                         E + 0 | 0 + E | E - 0 → E
  E - E | E · 0 | 0 · E | 0 - E | +0 | -1 | ·0 → 0
```

This is known as a context sensitive language, or string rewrite system. This particular example produces directed acyclic graphs, which we can think of as grafting or pruning the branches of a tree. If we must add two identical expressions, why evaluate them twice? If we need to multiply an expression by `0`, why evaluate it at all? Some say, "all trees are DAGs, but not all DAGs are trees". Growing up in the woods, I prefer to think of a DAG as a tree with a [gemel](https://en.wikipedia.org/wiki/Inosculation):

|Rewrite Rule|Deformed Tree|
|---|----|
|<center><img align="center" width="100%" src="../images/tree_dag.svg"/></center>|<br/><center><img align="center" width="50%" src="../images/tree_gemel.png"/></center>|
|<center><img align="center" width="100%" src="../images/tree_dag_minus.svg"/></center>|<br/><br/><center><img align="center" width="50%" src="../images/stump.png"/></center>|

Let us now introduce a new operator, `Dₓ`, and some corresponding rules. In effect, these rules will push `Dₓ` as far towards the leaves as possible, while rewriting terms along the way. We will also introduce some terminal rewrites:

```
[R0]       term → Dₓ(term)
[R1]      Dₓ(x) → 1                  
[R2]      Dₓ(y) → 0                  
[R3]    Dₓ(U+V) → Dₓ(U) + Dₓ(V)      
[R4]    Dₓ(U·V) → U·Dₓ(V) + Dₓ(U)·V  
[R5]     Dₓ(+U) → +Dₓ(U)
[R6]     Dₓ(-U) → -Dₓ(U)
[R7]     Dₓ(·U) → +U·Dₓ(U)
[R8]      Dₓ(1) → 0
[R9]      Dₓ(0) → 0
```

Although we assign an ordering `R0`-`R9` for notational convenience, an initial string, once given to this system, will always converge to the same result, no matter in which order we perform the substitutions (proof required):

|Term Confluence|Ottawa-St. Lawrence Confluence|
|:---:|:---:|
|<br/><center><img align="center" width="100%" src="../images/confluence_term.svg"/></center>|<br/><center><img align="center" width="75%" src="../images/confluence_river.png"/></center>|

This feature, called [confluence](https://en.wikipedia.org/wiki/Confluence_(abstract_rewriting)), is an important property of some rewrite systems: regardless of the substitution order, we will always arrive at the same result. If all strings in a language reduce to a form which can be simplified no further, we call such systems *strongly normalizing*, or *terminating*. If a rewriting system is both confluent and terminating it is said to be *convergent*.

## [λ-calculus](#λ-calculus)

So far, the languages we have seen are capable of generating and simplifying arithmetic expressions, but cannot by themselves perform arithmetic, since they cannot encode arbitrary numbers. We will now consider a language which can:

```
expr → var | func | appl
func → (λ var.expr)
appl → (expr expr)
```

To evaluate a `expr` in this language, we need a single substitution rule. The notation `expr[var → val]`, [we read as](https://groups.csail.mit.edu/mac/users/gjs/6.945/readings/Steele-MIT-April-2017.pdf#page=44), "within `expr`, `var` becomes `val`":

```
(λ var.expr) val → (expr[var → val])
```

For example, applying the above rule to the expression `(λy.y z) 1` yields `(λy.1 z)`. With this seemingly trivial addition, our language is now powerful enough to encode any computable function! Known as the pure λ-calculus, this system is equivalent to an idealized computer with infinite memory.

While grammatically compact, computation in the λ-calculus is not particularly terse. In order to perform any computation, we will need a way to encode values. For example, we can encode the boolean algebra like so:

```
[D1]           λx.λy.x = T     "true"
[D2]           λx.λy.y = F     "false"
[D3]       λp.λq.p q p = &     "and"
[D4]       λp.λq.p p q = |     "or"
[D5]    λp.λa.λb.p b a = !     "not"
```

To evaluate a boolean expression `!T`, we will first need to encode it as a λ-expression. Then, we can evaluate it using the λ-calculus as follows:

```
  (           !          ) T
→ (λp.λa.λb.    p     b a) T   [D5]
→ (   λa.λb.    T     b a)     [p → T]
→ (   λa.λb.(λx.λy.x) b a)     [D1]
→ (   λa.λb.(   λy.b)   a)     [x → b]
→ (   λa.λb.(   λy.b)    )     [y → a]
→ (   λa.λb.b            )     [y →  ]
→ (   F                  )     [D2]
```

We have now reached a terminal, and can recurse no further. Unlike its typed cousin, the untyped λ-calculus *not* strongly normalizing and thus not guaranteed to converge. If it were convergent, it would not be Turing complete.

## Cellular automata

Consider the [elementary cellular automata](https://en.wikipedia.org/wiki/Elementary_cellular_automaton), which consists of a one dimensional array, and a 3-cell rewrite system. There are $$2^{2^3} = 256$$ possible rules for rewriting the tape. It turns out even in this tiny space, there are remarkable automata. Consider the following rewrite system, known as [Rule 110](https://en.wikipedia.org/wiki/Rule_110):

<center>
<img align="center" src="../images/ca_rule%20110.png"/>
</center>

<!--![](https://en.wikipedia.org/wiki/Cellular_automaton#/media/File:One-d-cellular-automate-rule-30.gif)-->

<!--We can represent this using graphs:-->

<!--![image](../images/ca_rule30.png)-->

| current pattern           | `111` | `110` | `101` | `100` | `011` | `010` | `001` | `000` |
|:-------------------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:----:|
| next pattern | ` 0 `  | ` 1 `  | ` 1 `  | ` 0 `  | ` 1 ` | ` 1 `  | ` 1 `  | ` 0 `  |


To implement this machine, we can slide over the state and replace the centermost cell in any matching substring with the second row's value. [Robinson](http://wpmedia.wolfram.com/uploads/sites/13/2018/02/01-1-15.pdf) (1987) defines an ECA inductively, using a recurrence relation:

$$
a_i^{(t)} = \sum_j s(j)a_{i-j}^{(i-j)} \mod 2
$$

This might remind us of a certain operation from digital signal processing, called a [discrete convolution](https://en.wikipedia.org/wiki/Convolution#Discrete_convolution). We read $$f * g$$ as "$$f$$ convolved by $$g$$":

$$
(f * g)[n] = \sum_{m=-\infty}^{\infty} f[m]g[n-m]
$$

Here $$f$$ is our state and $$g$$ is called a "kernel". Similar to the λ-calculus, this system also is [known to be universal](https://wpmedia.wolfram.com/uploads/sites/13/2018/02/15-1-1.pdf). Disregarding efficiency, we could encode any computable function as an initial state and mechanically apply Rule 110 to simulate a TM, λ-calculus, or any other TC system.

# Graphs, inductively

Just like grammars, we can define graphs themselves inductively. As many graph algorithms are recursive, this choice considerably simplifies their implementation. Take one definition of an unlabeled directed graph, proposed by [Erwig](https://web.engr.oregonstate.edu/~erwig/papers/InductiveGraphs_JFP01.pdf) (2001). Here, the notation `list → [item]` is a shorthand for `list → item list`, where `item` is some terminal, and `list` is just a list of `item`s:

```
vertex  → int
adj     → [vertex]
context → (adj, vertex, adj)
graph   → empty | context & graph
```

Erwig defines a `graph` in four parts. First, we have a `vertex`, which is simply an integer. Next we have a list of vertices, `adj`, called an adjacency list. The `context` is a 3-tuple containing a `vertex` and symmetric references to its inbound and outbound neighbors, respectively. Finally, we have the inductive case: a `graph` is either (1) `empty`, or (2) a `context` and a `graph`.

<table>
<tr>
<td> <center><b>String</b></center> </td> <td><center><b><center>Graph</center></b></center></td>
</tr>
<tr>

<td>
<div markdown="1">
```

    ([3],       4, [1, 3])  &
    ([1, 2, 4], 3, [4]   )  &
    ([1],       2, [1, 3])  &
    ([2, 4],    1, [2, 3])

```
</div>
</td>
<td>
<div markdown="1">
<center><img src="../images/erwig.svg" width="60%"/></center>
</div>
</td>
</tr>
</table>


Let us consider a simple graph implementation in Kotlin. We do not record inbound neighbors, and attempt to define a vertex as a [closed neighborhood](https://en.wikipedia.org/wiki/Neighbourhood_(graph_theory)):

```kotlin
open class Graph(val vertices: Set<Vertex>) { ... }
data class Vertex(neighbors: Set<Vertex>): Graph(this + neighbors)
//                                               ↳ Compile error!
```

Note the coinductive definition, which creates problems right off the bat. Since `this` is not accessible inside the constructor, we cannot have cycles or closed neighborhoods. Maybe we can come up with a definition which allows cycles and closed neighborhoods by avoiding coinduction:

```kotlin
class Graph(val vertices: Set<Vertex>) { ... }
class Vertex(val neighbors: Set<Vertex>)
```

Already, this definition admits a nice k-nearest neighbors implementation:

```kotlin
tailrec fun Vertex.neighbors(k: Int = 0, vertices: Set<Vertex> =
                             neighbors + this): Set<Vertex> =
  if (k == 0 || vertices.neighbors() == vertices) vertices
  else knn(k - 1, vertices + vertices.neighbors() + this)

fun Set<Vertex>.neighbors() = flatMap { it.neighbors() }.toSet()

// Removes all vertices outside the set
fun Set<Vertex>.closure(): Set<Vertex> =
  map { vertex -> Vertex(neighbors.filter { it in this }) }.toSet()

fun Vertex.neighborhood(k: Int = 0) = Graph(neighbors(k).closure())
```

We can also define the [adjacency](https://en.wikipedia.org/wiki/Adjacency_matrix), [degree](https://en.wikipedia.org/wiki/Degree_matrix), and [Laplacian](https://en.wikipedia.org/wiki/Laplacian_matrix) matrices like so:

```kotlin
val Graph.adjacency = Mat(vertices.size, vertices.size).also { adj ->
  vertices.forEach { v -> v.neighbors.forEach { n -> adj[v, n] = 1 } }
}

val Graph.degree = Mat(vertices.size, vertices.size).also { deg ->
  V.forEach { v -> deg[v, v] = v.neighbors.size }
}

val Graph.laplacian = degree - adjacency
```

But what about cycles? To support cycles, we will need to modify our definition slightly, to delay edge instantiation until after construction:

```kotlin
class Graph(val vertices: Set<Vertex>) { ... }
class Vertex(map: (Vertex) -> Set<Vertex>) {
    val neighbors = map(this).toSet()
}
```

We can now call `Vertex() { setOf(it) }` to create a vertex with a self-loop.

Let us consider an algorithm called the Weisfeiler-Lehman isomorphism test, on which my colleague David Bieber has written a [nice piece](https://davidbieber.com/post/2019-05-10-weisfeiler-lehman-isomorphism-test/). I'll focus on the implementation. First, we need a pooling operator, which will aggregate all neighbors in our neighborhood using some summary statistic:

```kotlin
fun Graph.poolBy(statistic: Set<Vertex>.() -> Int): Map<Vertex, Int> =
  nodes.map { it to statistic(it.neighbors()) }.toMap()
```

Next, we'll need a histogram, which counts each node's neighborhood:

```kotlin
val histogram: Map<Vertex, Int> by lazy { poolBy { size } }
```

Now we're ready to define the [Weisfeiler-Lehman operator](http://www.jmlr.org/papers/volume12/shervashidze11a/shervashidze11a.pdf#page=6), which recursively computes a hash on the histogram for `k` rounds.

```kotlin
tailrec fun wl(k: Int, labels: Map<Vertex, Int>): Map<Vertex, Int> =
  if (k <= 0) labels
  else wl(k - 1, poolBy { map { labels[it]!! }.sorted().hashCode() })
```

We compute the hashcode of the entire graph by hashing the multiset of WL labels. With one round, we're just comparing the degree histogram. The more rounds we add, the more likely we are to detect a symmetry breaker:

```kotlin
override fun Graph.hashCode(rounds: Int = 10) = 
    wl(rounds, histogram).values.sorted().hashCode()
```

Finally, we can define a test to detect if one graph is isomorphic to another:

```kotlin
fun Graph.isIsomorphicTo(that: Graph) =
  this.nodes.size == that.nodes.size && 
  this.numOfEdges == that.numOfEdges && 
  this.hashCode() == that.hashCode()
```

That's it! This algorithm works on almost every graph you will ever encounter. For a complete implementation of `Graph`, refer to [this repository](https://github.com/breandan/kaliningraph).

TODO: Graph grammars are grammars on graphs.

TODO: Single/Double pushout

# [Graph languages](#graph-languages)

Approximately 20% of the human cerebral cortex is devoted to [visual processing](https://en.wikipedia.org/wiki/Occipital_lobe). By using visual representations, language designers can tap into powerful pattern matching abilities which are often underutilized by linear symbolic writing systems. Graphs are powerful communication and reasoning devices which have found many interesting applications various domain-specific languages:

|Language|Example|
|:------------------:|:-----:|
| [Finite automata](https://en.wikipedia.org/wiki/Finite-state_machine) | <br/><center><img align="center" width="50%" src="https://upload.wikimedia.org/wikipedia/commons/9/94/DFA_example_multiplies_of_3.svg"/></center> |
|  [Tensor network](https://www.mscs.dal.ca/%7Eselinger/papers/graphical-bib/public/Penrose-applications-of-negative-dimensional-tensors.pdf) | <br/><center><img align="center" width="50%" src="https://tensornetwork.org/diagrams/tensor_diagrams.png"/></center>|
| [Causal graphs](https://en.wikipedia.org/wiki/Causal_graph) | <br/><center><img align="center" width="50%" src="https://upload.wikimedia.org/wikipedia/commons/e/ea/College_notID.png"/></center> |
| [Category theory](https://www.cs.mcgill.ca/~prakash/Pubs/category_theory_notes.pdf) |<br/><center><img align="center" width="50%" src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Commutative_diagram_for_morphism.svg"/></center>|
| [Penrose notation](https://www.mscs.dal.ca/%7Eselinger/papers/graphical-bib/public/Penrose-applications-of-negative-dimensional-tensors.pdf) |<br/><center><img align="center" width="50%" src="https://enacademic.com/pictures/enwiki/80/Penrose_covariant_derivate.svg"/></center>|
|[Feynman diagrams](http://www-pnp.physics.ox.ac.uk/~barra/teaching/feynman.pdf)|<br/><center><img align="center" width="50%" src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Feynmann_Diagram_Gluon_Radiation.svg"/></center>|

<!--| [Petri networks](https://en.wikipedia.org/wiki/Petri_net) | <br/><center><img align="center" width="50%" src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Animated_Petri_net_commons.gif"/></center> |-->
<!--| [Proof networks](https://en.wikipedia.org/wiki/Proof_net) | <br/><center><img align="center" width="50%" src="https://www.researchgate.net/profile/Marco_Solieri/publication/311737880/figure/fig7/AS:501886778576905@1496670540685/Example-a-mMELL-proof-net-left-and-two-simple-mixed-nets-that-belong-to-its-expansion.png"/></center> |-->

The λ-calculus, which we saw [earlier](#λ-calculus), can also be interpreted graphically. I refer the gentle reader to the following proposals:

* [Graphic lambda calculus](https://arxiv.org/pdf/1305.5786.pdf)
* [Visual lambda calculus](http://bntr.planet.ee/lambda/work/visual_lambda.pdf)
* [To Dissect a Mockingbird: A Graphical Notation for the Lambda Calculus](http://dkeenan.com/Lambda/)

As Tae Danae Bradley [vividly portrays](https://www.math3ma.com/blog/matrices-probability-graphs), we can think of a matrix as not just a 2D array, but a *function on a vector space*. This perspective has a nice visual representation using a bipartite graph:

<center>
<a href="https://www.math3ma.com/blog/matrices-probability-graphs"><img align="center" width="75%" src="https://uploads-ssl.webflow.com/5b1d427ae0c922e912eda447/5c7ed4bcea0c9faeafe61466_pic1.jpg"/></a>
</center>

Not only do matrices correspond to graphs, graphs also correspond to matrices. One way to think of a graph is just a boolean matrix, or real matrix for weighted graphs. Consider an adjacency matrix containing nodes V, and edges E, where:

$$
\begin{align*}
\mathbf A \in \mathbb B^{|V|\times|V|} \text{ where } \mathbf A[u, v] =
    \begin{cases}
       1,& \text{if } u, v \in E \\
       0,& \text{otherwise}
    \end{cases}
\end{align*}
$$


<table>
<tr>
<td> <center><b>Geometric</b></center> </td> <td><center><b><center>Matrix</center></b></center></td>
</tr>
<tr>
<td>
<div markdown="1">
<center><img src="../images/ld_graph_dot.svg" width="50%"/></center>
</div>
</td>
<td>
<div markdown="1">
<center><img src="../images/ld_graph_mat.png" /></center>
</div>
</td>
</tr>
</table>

Note the lower triangular structure of the adjacency matrix, indicating it contains no cycles, a property which is not immediately obvious from the naïve geometric layout. Whenever a graph has a triangular adjacency matrix, this graph is called a directed acyclic graph. Called a topological ordering, this can be implemented by [multiplying](https://en.wikipedia.org/wiki/Topological_sorting#Parallel_algorithms) the adjacency matrix.

Both the geometric and matrix representations impose a extrinsic perspective on graphs, each with their own advantages and disadvantages. 2D renderings can be visually compelling, but require solving a [minimal crossing number](https://en.wikipedia.org/wiki/Crossing_number_(graph_theory)) or similar minimization to make network connectivity plain to the naked eye. While graph drawing is an active [field of research](http://www.graphdrawing.org/), matrices can often reveal symmetries that are not obvious from a naive graph layout.

Matrices are problematic for some reasons. Primarily, by treating a graph as a matrix, we impose an ordering over all vertices which is often arbitrary. Note also its sparsity, and consider the size of the matrix required to store even small graphs. While problematic, this can be overcome with [certain optimizations](https://en.wikipedia.org/wiki/Sparse_matrix). Despite their disadvantages, matrices and are a natural representation choice for many graph algorithms, particularly on modern parallel processing hardware.

<center><a href="https://epubs.siam.org/doi/book/10.1137/1.9780898719918"><img src="../images/graph_linear_algebra.png" width="60%"/></a></center>

Just like matrices, we can also think of a graph as a function on a state space, which carries information from state to state - given a state or set of states, it tells us which next states are reachable. Recent work in graph theory has revealed a fascinating duality between [graphs and linear algebra](https://epubs.siam.org/doi/book/10.1137/1.9780898719918), holding many important insights for dynamical processes on graphs.

# Graphs, computationally

What happens if we take a square matrix $$\mathbb{R}^{n\times n}$$ and raise it to a power? Which kinds of matrices converge? How can we analyze their asymptotics? This is a very fertile line of inquiry which has occupied engineers for the better part of the last century, with important applications in control theory, physical simulation and deep learning (RNNs). Linear algebra gives us a number of tricks for designing the matrix and normalizing the product to promote convergence, since systems which explode or vanish are not very interesting.

One way to interpret this is as follows: each time we multiply a matrix by a vector $$\mathbb{R}^{n}$$, we are effectively simulating a dynamical system at discrete time steps. This method is known as [power iteration](https://cs.mcgill.ca/~wlh/comp766/files/chapter1_draft_mar29.pdf#page=11) or the [Krylov method](http://www.mathnet.ru/links/ebf56bfe7abf0fa06968059ace96e215/im5215.pdf) in linear algebra. In the limit, we are seeking fixpoints, or eigenvectors, which are these islands of stability in our dynamical system. If we initialize our state at such a point, the transition matrix will send us straight back to where we started.

<details>
  <summary>Krylov Method</summary>
<center><img src="http://krylov-centre.ru/rus/images/exp_base/base-doccamers/base-doccamers-big-eng.jpg" width="50%"/></center>
<p align="justify"> There exists in St. Petersburg a naval research facility, known as the Krylov Shipbuilding Research Institute, which houses the world's largest <a href="https://krylov-centre.ru/en/experimental/base-doccamers/">full ocean depth hydraulic pressure tank</a>. Capable of simulating in excess of 20,000 PSI, the DK-1000 is used to test deepwater submersible vessels. Before inserting your <a href="https://fivedeeps.com/home/technology/sub/">personal submarine</a> for pressure testing, you may wish to perform a finite element analysis to ensure hull integrity. Instabilities in the stiffness matrix may produce disappointing results.</p>
</details>

$$
f(x, y) = \begin{bmatrix}
\frac{cos(x+2y)}{x} & 0 \\ 0 & \frac{sin(x-2y)}{y}
\end{bmatrix} *
\begin{bmatrix}x\\y\end{bmatrix} =
\begin{bmatrix}cos(x+2y)\\sin(x-2y)\end{bmatrix}
$$

<!--https://www.wolframalpha.com/input/?i=%7B%7Bcos%28x%2B2*y%29%2Fx%7D%2C+0%7D%2C+%7B0%2C%7Bsin%28x-2*y%29%2Fy%7D%7D+eigenvalues-->
<center><img src="../images/vector_field.png" width="63%"/></center>

We are looking for fixpoints where $$f(x, y) = f\circ f(x, y)$$, indicating the trajectory has terminated. Such points describe the asymptotic behavior of our function.

First, let's get some definitions out of the way.

```
  𝔹 → True | False
  ℕ → 0 | ... | 9
  ℤ → ℕ | ℕℤ | -ℤ
  ℝ → ℤ.ℤ
  T → 𝔹 | ℕ | ℤ | ℝ
vec → [Tⁿ]
mat → [[Tⁿ]ⁿ]
```

We can think of the Krylov method as either a matrix-matrix or matrix-vector product, or a recurrence relation:

<table>
<tr>
<td> <center><b>Grammar</b></center> </td> <td><center><b><center>Example</center></b></center></td>
</tr>
<tr>

<td>
<div markdown="1">
```
mmp → mat | mat * mat
mvp → (mmp) * vec
```
</div>
</td>
<td>
<div markdown="1">
$$(MM)V, (MMM)V, \ldots$$
</div>
</td>
</tr>
<tr>

<td>
<div markdown="1">
```

mvp → mat * vec | (mvp) * mat
```
</div>
</td>
<td>
<div markdown="1">
$$M(MV), M(M(MV)), \ldots$$
</div>
</td>
</tr>
<tr>

<td>
<div markdown="1">
```
fun → (mat * vec) / ‖ mat * vec ‖
rec → fun vec | (rec vec)
```
</div>
</td>
<td>
<div markdown="1">
$$\frac{Ab}{\|Ab\|}, \frac{A\frac{Ab}{\|Ab\|}}{\|A\frac{Ab}{\|Ab\|}\|}, \frac{A\frac{A\frac{Ab}{\|Ab\|}}{\|A\frac{Ab}{\|Ab\|}\|}}{\|A\frac{A\frac{Ab}{\|Ab\|}}{\|A\frac{Ab}{\|Ab\|}\|}\|}, \ldots$$
</div>
</td>
</tr>
</table>

Computational complexity aside, these three views are basically equivalent.

Such methods are not just applicable to real matrices, but can be used to analyze boolean and integer matrices. These are sometimes called [transition](https://ieeexplore.ieee.org/document/1086510), [stochastic or Markov](https://en.wikipedia.org/wiki/Stochastic_matrix) matrices. We are primarily interested in the deterministic version, whose variables inhabit $$\mathbb{B}^{n\times n}$$.

The Krylov methods have important applications for studying dynamical systems on networks. Researchers are just beginning to understand how eigenvalues of the Laplacian affect the asymptotic behavior of dynamical processes on graphs. In this section, we will explore some examples of dynamical processes on simple graphs.

<!--Three steps of Barabási's [preferential attachment algorithm](https://en.wikipedia.org/wiki/Preferential_attachment):-->

<!--|DOT Graph|Matrix|-->
<!--|:-------:|:----:|-->
<!--|<center><img src="../images/pref_graph0.svg"/></center>|<center><img src="../images/pref_mat0.png"/></center>|-->
<!--|<center><img src="../images/pref_graph1.svg"/></center>|<center><img src="../images/pref_mat1.png"/></center>|-->
<!--|<center><img src="../images/pref_graph2.svg"/></center>|<center><img src="../images/pref_mat2.png"/></center>|-->

We have previously seen an example of graph computation, Weisfeiler-Lehman, and topsort. Another early example of graph computation can be found in [Valiant](http://theory.stanford.edu/~virgi/cs367/papers/valiantcfg.pdf) (1975):

<center>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">TIL: CFL parsing can be reduced to boolean matrix multiplication (Valiant, 1975), known to be subcubic (Strassen, 1969), and later proven an asymptotic lower bound (Lee, 1997). This admits efficient GPGPU implementation (Azimov, 2017) in <a href="https://twitter.com/YaccConstructor?ref_src=twsrc%5Etfw">@YaccConstructor</a> <a href="https://t.co/3Vbml0v6b9">https://t.co/3Vbml0v6b9</a></p>&mdash; breandan (@breandan) <a href="https://twitter.com/breandan/status/1277136195118600192?ref_src=twsrc%5Etfw">June 28, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

This astonishing result suggests that, at least for context-free languages and their subsets, there is a parsing algorithm which is equivalent to matrix multiplication. For example, all of the following automata can be simulated using matrix multiplication:

- [Pushdown automata](https://en.wikipedia.org/wiki/Pushdown_automaton)
- [Buchi automata](https://en.wikipedia.org/wiki/B%C3%BCchi_automaton)
- [Mealy machines](https://en.wikipedia.org/wiki/Mealy_machine)
- [Petri nets](https://en.wikipedia.org/wiki/Petri_net)

What happens if we define arithmetic operators on graphs? How might we define and interpret these operations? As we have seen, one way to represent a directed graph is just a square matrix whose non-zero entries indicate edges between nodes. Just like real matrices in linear algebra, we can add, subtract, multiply and exponentiate them.

We will now show a few examples simulating a state machine using the Krylov method. For illustrative purposes, the state simply holds a vector of binary or integer values, however we can also imagine it carrying other "messages" around the graph in a similar manner, using another algebra. Here, we will use the boolean algebra for matrix multiplication, where `+` corresponds to logical disjunction (`∨`), and `*` corresponds to logical conjunction (`∧`):

```
┌───┬───┬─────┬─────┐
│ x │ y │ x*y │ x+y │        Boolean Matrix Multiplication
├───┼───┼─────┼─────┤ ┌─       ─┐ ┌─ ─┐ ┌─                     ─┐
│ 0 │ 0 │  0  │  0  │ │ a  b  c │ │ j │ │ a * j + b * k + c * l │
│ 0 │ 1 │  0  │  1  │ │ d  e  f │*│ k │=│ d * j + e * k + f * l │
│ 1 │ 0 │  0  │  1  │ │ g  h  i │ │ l │ │ g * j + h * k + i * l │
│ 1 │ 1 │  1  │  1  │ └─       ─┘ └─ ─┘ └─                     ─┘
└───┴───┴─────┴─────┘
```

## Linear chains

Let's iterate through a linked list. We will initialize the pointer to the head of the list, and use multiplication to advance the pointer by a single element. We add an implicit self loop to the final element, and halt whenever we detect a fixpoint.

<table>
<tr>
<td><center><b>Graph</b></center></td> <td><center><b>Matrix</b></center></td> <td><center><b>S</b></center></td><td><center><b>S'</b></center></td>
</tr>
<tr>
<td>

<div markdown="1">
<center><img src="../images/lin0.svg"/></center>
</div>

</td>
<td>
<div markdown="1">
```
    a  b  c
  ┌────────
a │ 0  0  0
b │ 1  0  0
c │ 0  1  1

```
</div>
</td>
<td>
<div markdown="1">
```


1
0
0

```
</div>
</td>
<td>
<div markdown="1">
```


0
1
0

```
</div>
</td>
</tr>
<tr>
<td> 
<div markdown="1">
<center><img src="../images/lin1.svg"/></center>
</div>
</td>
<td>
<div markdown="1">
```
    a  b  c
  ┌────────
a │ 0  0  0
b │ 1  0  0
c │ 0  1  1

```
</div>
</td>
<td>
<div markdown="1">
```


0
1
0

```
</div>
</td>
<td>
<div markdown="1">
```


0
0
1

```
</div>
</td>
</tr>
<tr>
<td> 
<div markdown="1">
<center><img src="../images/lin2.svg"/></center>
</div>
</td>
<td>
<div markdown="1">
```
    a  b  c
  ┌────────
a │ 0  0  0
b │ 1  0  0
c │ 0  1  1

```
</div>
</td>
<td>
<div markdown="1">
```


0
0
1

```
</div>
</td>
<td>
<div markdown="1">
```


0
0
1

```
</div>
</td>
</tr>
</table>

## Directed acyclic graphs

Simulating a DFA using a matrix can be inefficient, since we only ever inhabit one state at a time. The real benefit of using matrices comes when simulating nondeterminstic finite automata, [seen earlier](#regular-languages). 

Formally, an NFA is a 5-tuple $$\langle Q, \Sigma, \Delta, q_0, F \rangle$$, where $$Q$$ is a finite set of states, $$\Sigma$$ is the alphabet, $$\Delta :Q\times (\Sigma \cup \{\epsilon \})\rightarrow P(Q)$$ is the transition function, $$q_0 \in Q$$ is the initial state and $$F \subseteq Q$$ are the terminal states. An NFA can be represented as a labeled transition system, or directed graph whose adjacency matrix is defined by the transition function, with edge labels representing symbols from the alphabet and self-loops for each terminal state.

Typical implementations require cloning the NFA when multiple transitions are valid. Instead of cloning the machine, we can simulate the superposition of all states using a single matrix.

<table>
<tr>
<td><center><b>Graph</b></center></td> <td><center><b>Matrix</b></center></td> <td><center><b>S</b></center></td><td><center><b>S'</b></center></td>
</tr>
<tr>
<td> 
<div markdown="1">
<center><img src="../images/dag0.svg"/></center>
</div>
</td>
<td>
<div markdown="1">
```
    a  b  c  d
  ┌───────────
a │ 0  0  0  0
b │ 1  0  0  0
c │ 1  0  0  0
d │ 0  1  1  1

```
</div>
</td>
<td>
<div markdown="1">
```


1
0
0
0

```
</div>
</td>
<td>
<div markdown="1">
```


0
1
1
0

```
</div>
</td>
</tr>
<tr>
<td> 
<div markdown="1">
<center><img src="../images/dag1.svg"/></center>
</div>
</td>
<td>
<div markdown="1">
```
    a  b  c  d
  ┌───────────
a │ 0  0  0  0
b │ 1  0  0  0
c │ 1  0  0  0
d │ 0  1  1  1

```
</div>
</td>
<td>
<div markdown="1">
```


0
1
1
0

```
</div>
</td>
<td>
<div markdown="1">
```


0
0
0
1

```
</div>
</td>
</tr>
<tr>
<td> 
<div markdown="1">
<center><img src="../images/dag2.svg"/></center>
</div>
</td>
<td>
<div markdown="1">
```
    a  b  c  d
  ┌───────────
a │ 0  0  0  0
b │ 1  0  0  0
c │ 1  0  0  0
d │ 0  1  1  1

```
</div>
</td>
<td>
<div markdown="1">
```


0
0
0
1

```
</div>
</td>
<td>
<div markdown="1">
```


0
0
0
1

```
</div>
</td>
</tr>

</table>

We encode the accept state as a self cycle in order to detect the fixpoint $$S_{t+1} = S_{t}$$, after which we halt execution.

## Dataflow graphs

Suppose we have the function `f(a, b) = (a + b) * b` and want to compute `f(2, 3)`. For operator indices, we will need two tricks. First, all operators will retain their state, i.e. `1`s along all operator diagonals. Second, when applying the operator, we will combine values using the operator instead of performing a sum.

<table>
<tr>
<td><center><b>Graph</b></center></td> <td><center><b>Matrix</b></center></td> <td><center><b>S</b></center></td><td><center><b>S'</b></center></td>
</tr>
<tr>
<td> 
<div markdown="1">
<center><img src="../images/dfg0.svg"/></center>
</div>
</td>
<td>
<div markdown="1">
```
    a  b  +  *
  ┌───────────
a │ 0  0  0  0
b │ 0  0  0  0
+ │ 1  1  1  0
* │ 0  1  1  1

```
</div>
</td>
<td>
<div markdown="1">
```


2
3
0
0

```
</div>
</td>
<td>
<div markdown="1">
```


0
0
5
3

```
</div>
</td>
</tr>
<tr>
<td> 
<div markdown="1">
<center><img src="../images/dfg1.svg"/></center>
</div>
</td>
<td>
<div markdown="1">
```
    a  b  +  *
  ┌───────────
a │ 0  0  0  0
b │ 0  0  0  0
+ │ 1  1  1  0
* │ 0  1  1  1

```
</div>
</td>
<td>
<div markdown="1">
```


0
0
5
3

```
</div>
</td>
<td>
<div markdown="1">
```


0
0
0
15

```
</div>
</td>
</tr>
<tr>
<td> 
<div markdown="1">
<center><img src="../images/dfg2.svg"/></center>
</div>
</td>
<td>
<div markdown="1">
```
    a  b  +  *
  ┌───────────
a │ 0  0  0  0
b │ 0  0  0  0
+ │ 1  1  1  0
* │ 0  1  1  1

```
</div>
</td>
<td>
<div markdown="1">
```


0
0
0
15

```
</div>
</td>
<td>
<div markdown="1">
```


0
0
0
15

```
</div>
</td>
</tr>

</table>


<center><blockquote class="twitter-tweet"><p lang="en" dir="ltr">Prediction: In 20 years, most of today&#39;s ISAs (x86, ARM, MIPS) will be virtual or obsolete. Underneath the hood, everything will be sparse matmuls running on a homogeneous silicon mesh. Physical CPUs will be like gasoline engines - marvels of engineering, but far too complicated.</p>&mdash; breandan (@breandan) <a href="https://twitter.com/breandan/status/1278139598942679041?ref_src=twsrc%5Etfw">July 1, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>

# Graphs, efficiently

Due to their well-studied algebraic properties, graphs are suitable data structures for a wide variety of problems. Finding a reduction to a known graph problem can save years of effort, but many graph algorithms can be challenging to implement efficiently. Suboptimal graph algorithms have been reimplemented in dozens of libraries and compiler frameworks. Why have efficient graph-based algorithms remained out of reach for so long, and what has changed?

One issue with efficient representation of graphs is their space complexity. Suppose we have a graph with $$10^5=100,000$$ nodes, but only a single edge. We will need $$10^{5\times 2}$$ bits, or about 1 GB to store its adjacency matrix, where an equivalent adjacency list would only consume $$\lceil 2\log_2 10^5 \rceil = 34$$ bits. Most graphs are similarly sparse. But how do you multiply adjacency lists? One solution is to use [sparse matrix](https://en.wikipedia.org/wiki/Sparse_matrix) representations, which are more compact and can be exponentially faster on parallel computing architectures.

<center><a href="http://faculty.cse.tamu.edu/davis/suitesparse.html"><img src="http://faculty.cse.tamu.edu/davis/suitesparse_files/SuiteSparse_logo.jpg" width="60%"></a></center>

Perhaps the more significant barrier to widespread adoption of graph algorithms is their time complexity. Many interesting problems on graphs are NP-complete, including [Hamiltonian path](https://en.wikipedia.org/wiki/Hamiltonian_path) detection, [TSP](https://en.wikipedia.org/wiki/Travelling_salesman_problem) and [subgraph isomorphism](https://en.wikipedia.org/wiki/Subgraph_isomorphism_problem). However many of those problems have approximate solutions which are often good enough. But even if correctness is a hard constraint, CS theory is primarily concerned with worst case complexity, which seldom or rarely occurs in practice. Naturally occuring instances can often be solved quickly using SAT or SMT solvers.

Suppose we want to access the computation graph of a program from within the program itself. How could we accomplish that? We need a way to "reify" the graph (i.e. make it available at runtime), so that given any variable, we have some method (e.g. `y.graph()`) which programmatically returns its [transitive closure](https://en.wikipedia.org/wiki/Transitive_closure), including upstream and downstream nodes. Depending on scope and granularity, this graph can expand very quickly, so efficiency is key.

<center><img src="https://raw.githubusercontent.com/breandan/kotlingrad/master/samples/src/main/resources/lr_batch_loss_graph.svg" width="60%"/></center>

With the advent of modern metaprogramming languages like PyTorch and TensorFlow, such graphs are available to introspect at runtime. By tracing all operations (e.g. using operator overloading) on an intermediate data structure (e.g. stack, AST, or DAG), these DSLs are able to backpropogating error through a computation graph. At periodic intervals, they may perform certain optimizations (e.g. constant propagation, common subexpression elimination) and emit an intermediate language (e.g. CUDA, webasm) for optimized execution on special hardware, such as a GPU.

<center><blockquote class="twitter-tweet"><p lang="en" dir="ltr">This <a href="https://twitter.com/hashtag/GraphBLAS?src=hash&amp;ref_src=twsrc%5Etfw">#GraphBLAS</a> stuff is super exciting. Most graph algorithms can be expressed as linear algebra. Sparse matrix SIMD-backed graph algorithms lets us process orders-of-magnitude larger graphs. Similar to AD tools like Theano et al., this will give a huge boost to network science.</p>&mdash; breandan (@breandan) <a href="https://twitter.com/breandan/status/1277505360127983618?ref_src=twsrc%5Etfw">June 29, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></center>

Recent work in linear algebra and sparse matrix representations for graphs lets us treat many recursive graph algorithms as pure matrix arithmetic, with the associated benefits of GPU acceleration. The same techniques can also be applied to execute general purpose programs as graphs. More work will be needed 

A lot of the stuff in Graph Representation Learning is motivated by computational constraints. You can't instantiate the adjacency matrix, because it's too large, so you need all kinds of mathematical tricks to sum over or approximate it. But most graphs are sparse and have all kinds of symmetries. Finding the right graph embedding can get you real far...

# Programs as graphs

It turns out graphs are not only useful as data structures, but we can think of the computation itself as a graph on a binary state space. Each tick of the clock corresponds to one matrix multiplication on a boolean tape.

[Futamura](https://repository.kulib.kyoto-u.ac.jp/dspace/bitstream/2433/103401/1/0482-14.pdf) (1983) shows us that programs can be decomposed into two inputs, static and dynamic. This can be viewed as a function mapping inputs to output:

$$
P: I_{\text{static}} \times I_{\text{dynamic}} \rightarrow O
$$

Consider the static case, in which we have all the information available at compile time, we just need to multiply the state P: 𝔹<sup>|S|×|S|</sup> by the vector S until termination:

```
    [P]────────────────────────────────           } Program
      ╲          ╲          ╲          ╲
[S₀]───*───[S₁]───*───[S₂]───*───[..]───*───[Sₜ]  } TM tape
```


Now the dynamic case, P might be governed by another program:

```
        [Q]─────────────────────                  } Dynamics
          ╲          ╲          ╲
    [P₀]───*───[P₁]───*───[..]───*───[Pₜ₋₁]       } Program
      ╲          ╲          ╲          ╲
[S₀]───*───[S₁]───*───[S₂]───*───[..]───*───[Sₜ]  } TM tape
```

We might also imagine these inputs as being generated by higher order programs.

```
                     ⋮
            [R₀]─────────                         } World model
              ╲          ╲
        [Q₀]───*───[..]───*───[Pₜ₋₂]              } Dynamics
          ╲          ╲          ╲
    [P₀]───*───[P₁]───*───[..]───*───[Pₜ₋₁]       } Program
      ╲          ╲          ╲          ╲
[S₀]───*───[S₁]───*───[S₂]───*───[..]───*───[Sₜ]  } TM tape
```

What about programs of varying length? It may be the case we want to learn programs where t varies. The key is, we can choose an upper bound on t, and search for a fixpoint. That is, we halt whenever $$S_t = S_{t+1}$$.

There will always be some program, at the interface of the machine and the real world, which must be approximated. One question worth asking is how large does k need to be in order to do so? If it is very large, this procedure might well be intractable. Time complexity appears to be at worst $$\mathcal{O}(tn^2)$$, using Strassen, although considerably better if S is sparse.

# Program synthesis

Many people have asked me, "Why should developers care about automatic differentiation?" Yes, we can use it for building machine learning systems. Yes, it has specialized applications in robotics and physical simulation. But does it really matter for software engineers?

I have been thinking carefully about this question, and although it is not clear to me yet, I am starting to see how some pieces fit together. A more complete picture will require a lot more research, engineering and rethinking the role of software, compilers and machine learning.

```
    [P]────────────────────────────────           } Program
      ╲          ╲          ╲          ╲
[S₀]───*───[S₁]───*───[S₂]───*───[..]───*───[Sₜ]  } TM tape
```

Consider the static case seen above. Since the matrix P is fixed throughout execution, to learn P, we need to solve the following minimization problem:

$$
\underset{P}{\text{argmin}}\sum_{i \sim I_{static}}\mathcal L(P^t S^i_0, S_t)
$$

One issue with this formulation is we must rely on a loss over $$S_t$$, which is often too sparse and generalizes poorly. It may be the case that many interesting program synthesis problems have [optimal substructure](https://en.wikipedia.org/wiki/Optimal_substructure), so we should be making "progress" towards a goal state, and can define a loss over intermediate states. This needs to be explored in more depth.

Some, including [Gaunt et al.](https://arxiv.org/pdf/1608.04428.pdf) (2016), have shown gradient is not very effective, as the space of boolean circuits is littered with islands which have zero gradient. Their representation is also relative complex -- effectively, they are trying to learn a recursively enumerable language using something like a [Neural Turing Machine](https://arxiv.org/pdf/1410.5401.pdf) (Graves et al., 2014).

More recent work, including that of [Lample et al.](https://arxiv.org/pdf/1912.01412.pdf) (2019), have demonstrated Transformers are capable of learning programs which belong to the class of context-free languages. This space is often much more tractable to search and generate synthetic training data, and appears to be well within the reach of modern language models.

<center><img src="https://raw.githubusercontent.com/quark0/darts/master/img/darts.png" width="60%"/></center>

In the last year, a number of interesting reults in differentiable architecture search started to emerge. [DARTS](https://arxiv.org/pdf/1806.09055.pdf) (Liu et al., 2019) proposes to use gradient to search through the space of directed graphs. The authors first perform a continuous relaxation of the discrete graph, by reweighting the output of each each potential value by a hyperparameter, optimizing over the space of operations, then discretizing the output graph.

<center><a href="https://youtu.be/rwBbYhOAnPo?t=28272"><img src="../images/solar_lezma.png" width="70%"/></a></center>

Solar-Lezma calls this latter approach, "program extraction", where the network implicitly or explicitly parameterizes the function, which after training, can be decoded into a symbolic expression. This also aligns with Goodfellow's notion of deep networks as programs, where each step performs a certain "step" of computation.

<center>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">&quot;Can neural networks be made to reason?&quot; Conversation with Ian Goodfellow (<a href="https://twitter.com/goodfellow_ian?ref_src=twsrc%5Etfw">@goodfellow_ian</a>). Full version: <a href="https://t.co/3MYC8jWjwl">https://t.co/3MYC8jWjwl</a> <a href="https://t.co/tGcDwgZPA1">pic.twitter.com/tGcDwgZPA1</a></p>&mdash; Lex Fridman (@lexfridman) <a href="https://twitter.com/lexfridman/status/1130501145548513280?ref_src=twsrc%5Etfw">May 20, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
</center>

A less charitable interpretation is that Goodfellow is simply using a metaphor to explain deep learning to lay audience, but I prefer to think he is communicating something deeper about the role of recurrent nonlinear function approximators as computational primitives for logical reasoning.

# References

- [GRL Notes](https://cs.mcgill.ca/~wlh/comp766/notes.html)
- [Term Rewriting and All That](https://doi.org/10.1017/CBO9781139172752)
- [Representation of Events in Nerve Nets and Finite Automata](https://www.rand.org/content/dam/rand/pubs/research_memoranda/2008/RM704.pdf)
- [A Class of Models with the Potential to Represent Fundamental Physics](https://www.wolframphysics.org/technical-introduction/)