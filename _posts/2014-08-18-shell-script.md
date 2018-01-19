---
layout: post
title: IntelliJ IDEA on Linux
---

One of the challenges of using IDEs is compatibility - compatibility with frameworks, languages, tools, and a million different ways they can be used together. As a Linux user, your options are numbered - officially, IntelliJ IDEA and its cousins use the Oracle Java Development Kit, but neither Oracle's JDK nor OpenJDK offer perfect Linux support. The following shell script will install any Linux-compatible JetBrains IDE on any [Debian based Linux distribution](https://en.wikipedia.org/wiki/List_of_Linux_distributions#Debian-based).

{% highlight bash %}
{% include jetbrains-install.sh %}
{% endhighlight %}

The first issue you may notice is [poor font rendering](http://youtrack.jetbrains.com/issue/IDEA-57233), which is known to occur across several versions of Linux when running Swing applications, resulting in jagged or broken fonts in the UI and Editor. Here, the best course of action is to use a different font. You can switch your default font in Settings, under the 'Appearance' menu.

![Override default font](/images/override_font.jpg)

The second option is installing a third-party JDK such as [Infinality](http://www.infinality.net/blog/) or [tuxjdk](https://code.google.com/p/tuxjdk/) which attempt to improve font rendering within the OpenJDK project - install these at your own risk. For a full list and up-to-date information of issues on Linux, have a look at these [open tickets](http://youtrack.jetbrains.com/issues/IDEA?q=linux+sort+by%3A+votes+desc+%23Open#issueid=IDEA-22750) on YouTrack.

If you would like to see more support for IntelliJ IDEA, PyCharm, WebStorm, PhpStorm, Clion, RubyMine, DataGrip, et al. on Linux, one way you can contribute is reporting any issues you should encounter. There is a small but growing community of Linux users who are eager to share their knowledge, and by using and helping others use open source, we can all begin to write better software. Thanks for reading!
