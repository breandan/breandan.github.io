---
layout: post
title: IntelliJ IDEA on Linux
---

One of the challenges of using IDEs is compatibility - compatibility with frameworks, languages, tools, and a million different ways they can be used together. As a Linux user, your options are numbered - officially, IntelliJ IDEA and its cousins use the Oracle Java Development Kit, but neither Oracle's JDK nor OpenJDK offer perfect Linux support. The following shell script will install any Linux-compatible JetBrains IDE on any [Debian based Linux distribution](https://en.wikipedia.org/wiki/List_of_Linux_distributions#Debian-based).

{% highlight bash %}
#!/bin/sh

# We need root to install
[ $(id -u) != "0" ] && echo "Elevating to root..." && exec sudo "$0" "$@"

# Prompt for edition
while true; do
    read -p "Please select from one of the following choices:
    [1] IntelliJ IDEA Community Edition
    [2] IntelliJ IDEA Ultimate Edition
    [3] PyCharm Community Edition
    [4] PyCharm Professional Edition
    [5] Clion
    [6] WebStorm
    [7] RubyMine
    [8] PhpStorm
    [9] DataGrip
   > " CODE 

    case $CODE in
        1 ) CODE=IIC; IDE=idea; break;;
        2 ) CODE=IIU; IDE=idea; break;;
        3 ) CODE=PCC; IDE=pycharm; break;;
        4 ) CODE=PCP; IDE=pycharm; break;;
        5 ) CODE=CL;  IDE=clion; break;;
        6 ) CODE=WS;  IDE=webstorm; break;;
        7 ) CODE=RM;  IDE=rubymine; break;;
        8 ) CODE=PS;  IDE=phpstorm; break;;
        9 ) CODE=DG;  IDE=datagrip; break;;
    esac
done

echo "Installing $IDE..."

# Enable to install a JDK
# apt-get install openjdk-8-jdk
# add-apt-repository ppa:webupd8team/java && apt-get update && apt-get install oracle-java8-installer

# Prepend base URL for download
URL="https://data.services.jetbrains.com/products/download?platform=linux&code=$CODE"
echo "Downloading from $URL"

# Set download directory
DEST=$(mktemp)

# Download binary
echo "Downloading $IDE to $DEST..."
wget -cO ${DEST} ${URL} --read-timeout=5 --tries=0 --content-disposition

echo "Download complete."

# Set directory name
DIR="/opt/$IDE"

# Overwrite installation directory if it exists
if [ -d "$DIR" ]; then
    echo "Removing existing installation in $DIR"
    rm -rf $DIR
fi

# Untar file
if mkdir ${DIR}; then
    echo "Extracting $DEST to $DIR"
    tar -xzf ${DEST} -C ${DIR} --strip-components=1
fi

# Grab executable folder
BIN=${DIR}/bin

# Add permissions to install directory
echo "Adding permissions to $DIR"
chmod -R +rwx ${DIR}

# Enable to add desktop shortcut
# DESK=/usr/share/applications/${IDE}.desktop
# echo "[Desktop Entry]\nEncoding=UTF-8\nName=${IDE}\nComment=${IDE}\nExec=${BIN}/${IDE}.sh\nIcon=${BIN}/${IDE}.png\nTerminal=false\nStartupNotify=true\nType=Application" -e > ${DESK}

# Create symlink entry
TARGET=${BIN}/${IDE}.sh
echo "Placing symbolic link to $TARGET in /usr/local/bin/"
ln -sf ${TARGET} /usr/local/bin/${IDE}

# Prompt to launch newly installed IDE
while true; do
    read -p "Installation complete. To launch $IDE, run: $IDE
    Would you like to launch $IDE right now? (Y/N) > " REPLY

    case $REPLY ininstaller
        [yY] ) eval $IDE; break;;
        [nN] ) echo "Done."; break;;
    esac
done
{% endhighlight %}

The first issue you may notice is [poor font rendering](http://youtrack.jetbrains.com/issue/IDEA-57233), which is known to occur across several versions of Linux when running Swing applications, resulting in jagged or broken fonts in the UI and Editor. Here, the best course of action is to use a different font. You can switch your default font in Settings, under the 'Appearance' menu.

![Override default font](/images/override_font.jpg)

The second option is installing a third-party JDK such as [Infinality](http://www.infinality.net/blog/) or [tuxjdk](https://code.google.com/p/tuxjdk/) which attempt to improve font rendering within the OpenJDK project - install these at your own risk. For a full list and up-to-date information of issues on Linux, have a look at these [open tickets](http://youtrack.jetbrains.com/issues/IDEA?q=linux+sort+by%3A+votes+desc+%23Open#issueid=IDEA-22750) on YouTrack.

If you would like to see more support for IntelliJ IDEA, PyCharm, WebStorm, PhpStorm, Clion, RubyMine, DataGrip, et al. on Linux, one way you can contribute is reporting any issues you should encounter. There is a small but growing community of Linux users who are eager to share their knowledge, and by using and helping others use open source, we can all begin to write better software. Thanks for reading!
