---
layout: post
title: IntelliJ IDEA on Linux
---

The following script installs a JetBrains IDE on any [Debian based Linux distro](https://en.wikipedia.org/wiki/List_of_Linux_distributions#Debian-based). To download it, simply run `wget z.ndan.co/jetbrains-install.sh`:

{% highlight bash %}
{% include jetbrains-install.sh %}
{% endhighlight %}

Next, run `chmod 755 jetbrains-install.sh && ./jetbrains-install.sh` and follow the instructions. Once the chosen IDE has launched, one issue you may encounter is [poor font rendering](https://youtrack.jetbrains.com/issue/IDEA-57233), which can occur on certain Linuxes when running Swing applications, resulting in jagged or broken fonts in the UI and Editor. Here, the best course of action is to use a different font. You can switch your default font in Settings, under the 'Appearance' menu.

![Override default font](/images/override_font.jpg)

If you would like to see further support for IntelliJ IDEA, PyCharm, WebStorm, PhpStorm, Clion, RubyMine, DataGrip, et al. on Linux, one way you can contribute is by [reporting issues](https://youtrack.jetbrains.com/issues/IDEA?q=linux+sort+by%3A+votes+desc+%23Open#issueid=IDEA-22750) that you encounter on Linux. There is a small but growing community of Linux users, and by reporting issues, you will improve the IDE for everyone. Thanks for reading, and if you have feedback on the install script, please [reach out to me](https://twitter.com/breandan)!