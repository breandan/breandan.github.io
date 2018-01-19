---
layout: post
title: IntelliJ IDEA on Linux
---

The IntelliJ Platform officially supports Linux operating systems running GNOME or KDE. The following script installs a JetBrains IDE on any [Debian based Linux distribution](https://en.wikipedia.org/wiki/List_of_Linux_distributions#Debian-based). First paste `wget z.ndan.co/jetbrains-install.sh` into a terminal to download the following script:

{% highlight bash %}
{% include jetbrains-install.sh %}
{% endhighlight %}

To use it, run the command `chmod 755 jetbrains-install.sh && ./jetbrains-install.sh` and follow the instructions. Once the choosen IDE has launched, the first issue you may notice is [poor font rendering](http://youtrack.jetbrains.com/issue/IDEA-57233), which is known to occur across several versions of Linux when running Swing applications, resulting in jagged or broken fonts in the UI and Editor. Here, the best course of action is to use a different font. You can switch your default font in Settings, under the 'Appearance' menu.

![Override default font](/images/override_font.jpg)

The second option is installing a third-party JDK such as [Infinality](http://www.infinality.net/blog/) or [tuxjdk](https://code.google.com/p/tuxjdk/) which attempt to improve font rendering within the OpenJDK project - install these at your own risk. For a full list and up-to-date information of issues on Linux, have a look at these [open tickets](http://youtrack.jetbrains.com/issues/IDEA?q=linux+sort+by%3A+votes+desc+%23Open#issueid=IDEA-22750) on YouTrack.

If you would like to see further support for IntelliJ IDEA, PyCharm, WebStorm, PhpStorm, Clion, RubyMine, DataGrip, et al. on Linux, one way you can contribute is by [reporting issues](https://youtrack.jetbrains.com/issues?q=linux) that you encounter on Linux. There is a small but growing community of Linux users, and by reporting issues, you will improve the IDE for everyone. Thanks for reading, and if you have feedback on the install script, please [reach out to me](https://twitter.com/breandan)!