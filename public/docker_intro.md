# Intro to Docker for Robotics and Machine Learning

![](https://user-images.githubusercontent.com/175716/40453381-034becbe-5eb3-11e8-9cbf-53507b165d02.png)

## Docker is a tool for portable, reproducible computing
 
It would be nice to give a computer - any computer with an internet connection - a short string of ASCII characters (say via a keyboard), press enter, and return to see some program running. Forget about where the program was built or what software you happened to be running at the time (this can be checked, and we can fetch the necessary dependencies). Sounds simple, right? In fact, this is an engineering task that has taken thousands of the world’s brightest developers many decades to implement. Thanks to the magic of [container technology](https://en.wikipedia.org/wiki/Operating-system-level_virtualization) we now can run any Linux program on almost any networked device on the planet, as is. All of the environment preparation, installation and configuration steps can be automated from start to finish. Depending on how much network bandwidth you have, it might take a while, but that’s all right. All you need to do is type the string correctly.

## Docker containers are easy to install

Let’s say you have never used Docker. To get Docker, run this command on a POSIX shell of any [Docker-supported platform](https://docs.docker.com/install/#supported-platforms):

```
curl -sSL https://get.docker.com/ | sh
```

Now you have installed Docker! Suppose your friend, Daphne, has a Docker **container**. How can we run this container? Docker containers live inside **registries**, which are servers that host Docker images. A Docker **image** is basically a filesystem snapshot - a single file that contains everything you need to run her container.

![](https://user-images.githubusercontent.com/175716/40452992-bea258e2-5eb1-11e8-914d-0980524c7469.png)
*Docker ships with a default registry, called the [Docker Hub](https://hub.docker.com/), a big server that is home to many useful repositories.* 

You can fetch Daphne’s container by running the following command to pull it from her Docker Hub repository:

```
$ docker pull daphne/duck
```

Now you have Daphne’s Docker image. To see a list of Docker images on your machine, type:

```
$ docker images
```

Every image has a image ID, a name and a tag:

```
REPOSITORY      TAG        IMAGE ID         CREATED       SIZE
daphne/duck     latest     ea2f90g8de9e     1 day ago     869MB
```

To run a Docker container, type the name of the container, like so:

```
$ docker run daphne/duck
```

Now you are running Daphne’s container. To verify it is running, type:

```
$ docker ps
CONTAINER ID     IMAGE           ...     NAMES
52994ef22481     daphne/duck     ...     happy_hamster
```

Note how Daphne's container has container ID, a base image, and a funny-looking name.

## Containers come from other containers

So you have a terminal and an internet connection? Doesn’t matter what operating system you’re running. Now you can run almost any Linux program in just a few keystrokes. No further steps are necessary. How neat is that? To have a single tool that clones a program and its environment, fetches the appropriate dependencies, and runs on any OS is a big timesaver. Suppose you have a program that runs on one computer. It is extremely likely to run on any other, regardless of the underlying OS or hardware. But how do you create a Docker image? There are two ways. You can either snapshot a running Docker container, or you can write a plaintext recipe. First, let’s see how to create a snapshot:

```
$ docker run -it daphne/duck bash
```

This will launch Daphne’s container and drop us into a bash session within. Suppose we make a change to the Docker container like so:

```
root@295fd7879184:/# touch new_file && ls
total 0
-rw-r--r-- 1 root root 0 May 21 20:52 new_file
```

However if we exit the container and rerun it, we may notice an alarming result:

```
root@18f13bb4571a:/# ls
root@18f13bb4571a:/# touch new_file1 && ls
total 0
-rw-r--r-- 1 root root 0 May 21 21:32 new_file1
```

It seems like `new_file` has disappeared! This result may be somewhat less surprising when we notice the container ID has changed. Let’s open a new terminal (without leaving the current one) to see what’s running:

```
$ docker ps
CONTAINER ID     IMAGE           ...     NAMES
52994ef22481     daphne/duck     ...     happy_hamster
18f13bb4571a     daphne/duck     ...     shady_giraffe
```

To save the running container, we can snapshot or “commit” a new image to our repository:

```
$ docker commit -m “fork Daphne’s duck” shady_giraffe your/duck:v2
```

Wherever you see a funny-looking name like `shady_giraffe`, we either can use the ID, `18f13bb4571a` or the designated name, `shady_giraffe`. Here, `your` should be your username on a Docker registry. Now we can push this to the world, and anyone with access on the registry can pull our Docker image:

```
$ docker push your/duck:v2
$ docker images
REPOSITORY    TAG        IMAGE ID         CREATED          SIZE
daphne/duck   latest     ea2f90g8de9e     1 day ago        869MB
your/duck     v2         d78be5cf073e     2 seconds ago    869MB
$ docker pull your/duck:v2 #Anyone can run this!
$ docker run your/duck ls
total 0
-rw-r--r-- 1 root root 0 May 21 21:32 new_file1
```

## Containers come from recipies

The second way to create a Docker image is to write a recipe, called a Dockerfile. A Dockerfile is a text file that specifies the commands required to create a Docker image, typically by modifying an existing container image using a scripting interface. They also have special keywords like `FROM`, `RUN`, `ENTRYPOINT` and so on. For example:

```
$ echo -e '
FROM dapne/duck
RUN touch new_file1   # new_file1 will be part of our snapshot
CMD ls                # This will be run whenever the container is started
' >> Dockerfile
```

Now, to build the image we can simply run:

```
$ docker build -t your/duck:v3 .
$ docker images
REPOSITORY    TAG        IMAGE ID         CREATED          SIZE
daphne/duck   latest     ea2f90g8de9e     1 day ago        869MB
your/duck     v2         d78be5cf073e     5 minutes ago    869MB
your/duck     v3         05a3bd381fc2     2 seconds ago    869MB
```

This is identical to the procedure we did earlier, except the result is much cleaner. Now, instead of needing to carry around a 869MB BLOB, we can just store the 4KB text file and rest assured that all our important changes are contained within. Similar to before, we can simply run:

```
$ docker run -it your/duck:v3
total 0
-rw-r--r-- 1 root root 0 May 21 21:35 new_file1
root@500d0dca385d:/#
```

Notice as soon as we run the container, Docker runs our `ls` command, revealing `new_file1` was already present. This was part of the container build.

Docker has a concept of layers. Every line we add to the Dockerfile that begins with one of the Dockerfile keywords (denoted in ALL CAPS) will add a new layer, which is conveniently cached by the [Docker daemon](https://docs.docker.com/engine/reference/commandline/dockerd/). If we change some lines in a large Dockerfile, Docker will only need to rerun the lines that have changed. Let’s have a look:

```
FROM dapne/duck                             # Defines the base container
RUN touch new_file1                         # Defines a new layer
RUN mkdir config && mv new_file1 mkdir      # Each layer can have multiple commands
RUN curl -sSL https://get.your.app/ | sh    # Layers can have a script
```

Suppose we make a change at the bottom of our Dockerfile. If Docker had to rerun the entire recipie from top to bottom to rebuild our image, this would be slow and inconvenient. Fortunately, Docker is smart enough to only rerun the minimum set of commands to rebuild our image. This is a very convenient feature, especially when you're on a tight schedule.