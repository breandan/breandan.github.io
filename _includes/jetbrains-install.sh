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
   [5] CLion
   [6] WebStorm
   [7] RubyMine
   [8] PhpStorm
   [9] DataGrip
  > " CODE
   case "${CODE}" in
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

# Get location header for file URL
FILE_URL=$(wget -qSO --max-redirect 0 --spider "$URL" 2>&1 \
           | tac | grep -P -o -m 1 "(?<=Location: ).*")

LATEST_VERSION=$(echo ${FILE_URL} | grep -P -o "(?<=/)[^/]*(?=.tar.gz)")

echo "Found $LATEST_VERSION available to download..."

# Set install directory
INSTALL_DIR="/opt/$LATEST_VERSION"

# Check if latest version has been installed
if [ -d "$INSTALL_DIR" ]; then
   echo "Found an existing installation directory: $INSTALL_DIR"
   echo "$LATEST_VERSION may have previously been installed."
   while true; do
       read -p "Would you like to reinstall? (Y/N) > " REPLY
       case $REPLY in
           [yY] ) echo "Reinstalling $LATEST_VERSION..."; break;;
           [nN] ) echo "Installation cancelled."; exit 1; break;;
       esac
   done
fi

# Set download directory
DOWNLOAD_DIR=$(mktemp)

# Download binary
echo "Downloading $LATEST_VERSION from $FILE_URL to $DOWNLOAD_DIR"
wget -cO ${DOWNLOAD_DIR} ${FILE_URL} --read-timeout=5 --tries=0
echo "Download complete."

# Overwrite installation directory if it exists
if [ -d "$INSTALL_DIR" ]; then
   echo "Removing existing installation in $INSTALL_DIR"
   rm -rf ${INSTALL_DIR}
fi

# Untar file
if mkdir ${INSTALL_DIR}; then
   echo "Extracting $DOWNLOAD_DIR to $INSTALL_DIR"
   tar -xzf ${DOWNLOAD_DIR} -C ${INSTALL_DIR} --strip-components=1
fi

# Grab executable folder
BIN=${INSTALL_DIR}/bin

# Add permissions to install directory
echo "Adding permissions to $INSTALL_DIR"
chmod -R +rwx ${INSTALL_DIR}

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
   case $REPLY in
       [yY] ) eval ${IDE}; break;;
       [nN] ) echo "Done."; break;;
   esac
done