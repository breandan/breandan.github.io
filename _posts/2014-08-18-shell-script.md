---
layout: post
title: IntelliJ IDEA on Linux
---

One of the challenges of building an IDE is compatibility - compatibility with frameworks, languages, tools, and a million different ways they can be used together. IntelliJ IDEA and its cousins run on Java, which is one reason it is able to support so many technologies without also having to target three different operating systems at the same time. 

But, "write once, run anywhere," can sometimes be unrealistic. As a Linux user, your options may be numbered - officially, IntelliJ IDEA uses the Oracle Java Development Kit, but neither Oracle's JDK nor OpenJDK offer perfect Linux support. If you are determined to use IntelliJ IDEA on Linux, the following shell script will help install IntelliJ IDEA on a distro running GNOME or KDE.

{% highlight bash %}
#!/bin/sh

echo "Installing IntelliJ IDEA..."

# We need root to install
[ $(id -u) != "0" ] && exec sudo "$0" "$@"

# Attempt to install a JDK
# apt-get install openjdk-8-jdk
# add-apt-repository ppa:webupd8team/java && apt-get update && apt-get install oracle-java8-installer

# Prompt for edition
while true; do
    read -p "Enter 'U' for Ultimate or 'C' for Community: " ed 
    case $ed in
        [Uu]* ) ed=U; break;;
        [Cc]* ) ed=C; break;;
    esac
done

# Fetch the most recent version
VERSION=$(wget "https://www.jetbrains.com/intellij-repository/releases" -qO- | grep -P -o -m 1 "(?<=https://www.jetbrains.com/intellij-repository/releases/com/jetbrains/intellij/idea/BUILD/)[^/]+(?=/)")

# Prepend base URL for download
URL="https://download.jetbrains.com/idea/ideaI$ed-$VERSION.tar.gz"

echo $URL

# Truncate filename
FILE=$(basename ${URL})

# Set download directory
DEST=~/Downloads/$FILE

echo "Downloading idea-I$ed-$VERSION to $DEST..."

# Download binary
wget -cO ${DEST} ${URL} --read-timeout=5 --tries=0

echo "Download complete!"

# Set directory name
DIR="/opt/idea-I$ed-$VERSION"

echo "Installing to $DIR"

# Untar file
if mkdir ${DIR}; then
    tar -xzf ${DEST} -C ${DIR} --strip-components=1
fi

# Grab executable folder
BIN="$DIR/bin"

# Add permissions to install directory
chmod -R +rwx ${DIR}

# Set desktop shortcut path
DESK=/usr/share/applications/IDEA.desktop

# Add desktop shortcut
echo "[Desktop Entry]\nEncoding=UTF-8\nName=IntelliJ IDEA\nComment=IntelliJ IDEA\nExec=${BIN}/idea.sh\nIcon=${BIN}/idea.png\nTerminal=false\nStartupNotify=true\nType=Application" -e > ${DESK}

echo "Done."
{% endhighlight %}

The first issue you may notice when using IntelliJ IDEA is [poor font rendering](http://youtrack.jetbrains.com/issue/IDEA-57233), which is known to occur across several versions of Linux when running Swing applications, resulting in jagged or broken fonts in the UI and Editor. Here, the best course of action is to use a different font. You can switch your default font in IntelliJ IDEA from Settings, under the 'Appearance' menu.

![Override default font](/images/override_font.jpg)

The second option is installing a third-party JDK such as [Infinality](http://www.infinality.net/blog/) or [tuxjdk](https://code.google.com/p/tuxjdk/) which attempt to improve font rendering within the OpenJDK project - install these at your own risk. For a full list and up-to-date information of issues on Linux, take a look at these [open tickets](http://youtrack.jetbrains.com/issues/IDEA?q=linux+sort+by%3A+votes+desc+%23Open#issueid=IDEA-22750) on YouTrack.

If you would like to see more support for OpenJDK and IntelliJ IDEA on Linux, one way you can contribute is by using them and reporting any issues you should encounter. There is a small but growing community of Linux users who are eager to share their knowledge, and by using and helping others use open source, we can all begin to write better software. Take the challenge today!
