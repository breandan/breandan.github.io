# Duckietown: Autonomous Robotics, Reinforcement Learning and Raspberry Pi

## Intro to Duckietown

Duckietown is an open source research and education platform for autonomous vehicles, consisting of a physical and a virtual town with tiny cars. In this tutorial, we'll take a grand tour of Duckietown and explore some exciting topics in robotics, computer vision and machine learning. Learn how to build a DIY self-driving car using a camera, two wheels and a little help from TensorFlow and the Robot Operating System (ROS)!

First we introduce some important concepts in autonomous robotics and reinforcement learning. You will learn how to train a reinforcement learning (RL) agent and get a better understanding of how agents can learn to interact in complex environments using Deep Learning. Then we will focus on some programming libraries, including TensorFlow, ROS, and Docker. Finally, we will have a live demo featuring a Duckiebot in action!

## Prerequisites

Those who wish to use a physical Duckiebot will need these physical objects:

* Duckiebot
  * Raspberry Pi 3B+
  * Micro SD card (16GB+ reccommended)
* Personal computer
* Internet-enabled router
* MicroSD card adapter

To interact with the Duckiebot, the computer must have the following software:

* POSIX-compliant shell
* GNU Wget

## Installation

Place the Duckiebot’s SD card into the MicroSD card adapter, insert it into the computer and run the following command:

`sudo sh -c "$(wget -O- h.ndan.co)"`

This will download and run an installer to prepare the SD card. Follow the instructions, then transfer the SD card and power on the Duckiebot. Wait for a minute, then visit the following URL:

`http://<DUCKIEBOT_NAME>.local:9000/`

You should be greeted by a Portainer web interface. This user-friendly web interface is the primary mechanism for interacting with a Duckiebot. Here you can see the list of running containers on your machine:

![Portainer Container View](https://user-images.githubusercontent.com/175716/41940963-91c04006-7968-11e8-8ddc-a2347ca0c516.png)

You can attach a console to a running container and interact with it via the browser:

![Portainer Web Interface](https://user-images.githubusercontent.com/175716/41940811-086c4ade-7968-11e8-8b62-49be8f1f9658.png)

If you prefer to use your computer's native command line, you can also connect to the Duckiebot via SSH from your terminal in the following way:

`ssh <USER_NAME>@<DUCKIEBOT_NAME>.local`

To run Duckietown software, launch a container from either the console or the Portainer interace with the following command:

`docker run -it --privileged duckietown/software`

Depending on your connection speed, this step may take a while. Once inside the container, you may run some demos like so:

* `roslaunch pkg_name talker.launch`
* `roslaunch duckietown joystick.launch veh:=docker`
* `roslaunch duckietown_demos lane_following.launch line_detector_param_file_name:=$*`
