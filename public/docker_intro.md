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

However if we exit the container and rerun, we may notice an alarming result:

```
root@295fd7879184:/# exit
exit
$ docker run -it daphne/duck bash
root@18f13bb4571a:/# ls
root@18f13bb4571a:/# touch new_file1 && ls
total 0
-rw-r--r-- 1 root root 0 May 21 21:32 new_file1
```

It seems like `new_file` has disappeared! Notice how the container ID (`18f13bb4571a`) is now different. This is because we ran a new container from the image `daphne/duck`, rather than restarting our old container. Let's see all the containers on our machine:

```
$ docker container ls -a
CONTAINER ID     IMAGE           ...     STATUS                              NAMES
295fd7879184     daphne/duck     ...     Exited (130) About a minute ago     merry_manatee
18f13bb4571a     daphne/duck     ...     Up 5 minutes                        shady_giraffe
52994ef22481     daphne/duck     ...     Up 10 minutes                       happy_hamster
```

It looks like `295fd7879184` a.k.a. `merry_manatee` survived, but it is no longer running. Whenever a container's main process (recall we ran `merry_manatee` with `bash`) finishes, the container will stop, but it will not cease to exist. In fact, we can resume the stopped container right where we left off:

```
$ docker start -a merry_manatee
root@295fd7879184:/# ls
total 0
-rw-r--r-- 1 root root 0 May 21 20:52 new_file
```

Nothing was lost! Let’s open a new terminal (without leaving the current one) to see what other containers are running:

```
$ docker ps
CONTAINER ID     IMAGE           ...     NAMES
295fd7879184     daphne/duck     ...     merry_manatee
18f13bb4571a     daphne/duck     ...     shady_giraffe
52994ef22481     daphne/duck     ...     happy_hamster
```

Now suppose we would like to share the container `shady_giraffe` with someone else. To do so, we must first snapshot the running container, or **commit** it to a new image, giving it a name and a tag. This will create a checkpoint which we may later refer to:

```
$ docker commit -m “fork Daphne’s duck” shady_giraffe your/duck:v2
```

Wherever you see a funny-looking name like `shady_giraffe` in Docker, this is just another way to refer to container. We either can use the container ID, `18f13bb4571a` or the designated name, ie. `shady_giraffe`. The above `your` can be your username on a Docker registry. This image will be called `your/duck`, and has an optional tag, `v2`. Now we can push it to the registry:

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

This is a convenient way to share an image with others. Anyone with access to the repository can start using our image right as we left it, or create another image based on our own. Images can be created via the command line or by using something called a `Dockerfile`.

## Containers come from recipies

The second way to create a Docker image is to write a recipe, called a `Dockerfile`. A `Dockerfile` is a text file that specifies the commands required to create a Docker image, typically by modifying an existing container image using a scripting interface. They also have special keywords like `FROM`, `RUN`, `ENTRYPOINT` and so on. For example:

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
