---
layout: post
title: On Static Imports in Java
---

Recently someone asked me, "Breandan, why do I need to write ```import static org.junit.Assert.*;``` in order to use JUnit assertions?" I did not immediately have a good answer, besides the tautology that static imports were used to access static members, and made things generally more readable. What I did not realize, is that there is a very explicit reason why [fluent interfaces](http://en.wikipedia.org/wiki/Fluent_interface#Java) such as jOOQ, Mockito, TestNG and JUnit4 have all chosen to adopt this [language feature](https://www.jcp.org/aboutJava/communityprocess/review/jsr201/), and that reason is [The Constant Interface Antipattern](http://books.google.com/books?id=ka2VUBqHiWkC&pg=PA98&lpg=PA98&dq=Constant+Interface+Antipattern+effective+java&source=bl&ots=yYLmKlrZP2&sig=ilYBLq82LEMiWXijRBlcVNyqTK4&hl=en&sa=X&ei=tbVIU8vqB-fn2wW3voHIBA&ved=0CEcQ6AEwAw#v=onepage&q=Constant%20Interface%20Antipattern%20effective%20java&f=false). 

Prior to JUnit4, test classes would inherit the static members of ```junit.framework.Assert``` by extending ```junit.framework.TestCase```. [TestCase](http://junit.sourceforge.net/junit3.8.1/javadoc/junit/framework/TestCase.html#methods_inherited_from_class_junit.framework.Assert) was the parent test class, and by extending it, we had access to a standard set of assertions. Now you might say, "Well Breandan, what does this have to do with The Constant Interface Antipattern? This is a perfectly canonical use of inheritance." It turns out that by forcing test classes to inherit from TestCase, users are restricted from building more natural test hierarchies and must reimplmenent common functionality or resort to interfaces and utility classes to access a static member. So there must be a better way. 

Enter static imports. There is a [selective use case](http://docs.oracle.com/javase/1.5.0/docs/guide/language/static-import.html) here. We must be careful not to pollute the namespace with ambiguous member functions, yet would still like to have some measure of brevity for DSLs and commonly used functions. We would prefer composition over inheritance and allowing the user the flexibility to write standalone test cases. Static imports are appealing for number of reasons: tests use assertions, but assertions 'belong' no more to test cases than exceptions belong to a handler. Assertions are frequently used, but seldom all at once (test cases should be short and concise), thereby encouraging users to think carefully about what types of assertions are being used. And ```assertEquals(...)``` is simple and recognizable, reducing boilerplate. 

You might be curious how to start writing your own tests in IntelliJ with just a few keystrokes. You can simply press [CTRL+SHIFT+T] within the class you would like to cover, select JUnit4 within the wizard (import the library if prompted), and immeadiately begin writing your unit test (don't forget to annotate with @Test). Once you are ready to assert a result, type assert[CTRL+ALT+SPACE] and navigate to the desired assertion, then press [ALT+ENTER] and statically import the assertion method for maximum typing efficiency. 

![Screenshot](/images/staticImport.gif)

Further Reading

* [Are Static Imports Becoming Increasingly Accepted in Java?](http://marxsoftware.blogspot.com/2012/04/are-static-imports-becoming.html)
* [Unit Testing with JUnit 4 in Java](http://www.doublecloud.org/2013/08/unit-testing-with-junit-4-in-java-quick-introduction-and-simple-samples/) 
