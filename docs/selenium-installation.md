Selenium installation guide
===========================
For using [plus.garden.webdriver](https://github.com/Dsazz/plus.garden.webdriver/) you should install and run 
[Selenium](http://www.seleniumhq.org/download/) server. You can install and manage it in any convenient way. 

We provide list of steps below for installing Selenium, which we tested in our package.

Webdriver-manager
-----------------

### Getting Started

```
npm install -g webdriver-manager
```

### Setting up a Selenium Server

Prior to starting the selenium server, download the selenium server jar and driver binaries. By default it will download the selenium server jar and chromedriver binary.

```
webdriver-manager update
```

### Starting the Selenium Server

By default, the selenium server will run on `http://localhost:4444/wd/hub`.

```
webdriver-manager start
```

For more details see [here](https://github.com/angular/webdriver-manager#webdriver-manager--).


Docker
------

### elgalu/docker-selenium

The purpose of this project is to have [Selenium](http://www.seleniumhq.org/download/) running as simple and as fast as possible.

1. Pull the image and run the container

        docker pull elgalu/selenium #upgrades to latest if a newer version is available

        docker run -d --name=grid -p 4444:24444 -p 5900:25900 \
            -e TZ="US/Pacific" --shm-size=1g elgalu/selenium

2. Wait until the grid starts properly before starting the tests _(Optional but recommended)_

        docker exec grid wait_all_done 30s
        # Or if docker exec is not available (eg. circleci)
        wget --retry-connrefused --no-check-certificate -T 30  http://localhost:4444/grid/console -O /dev/null

After this, [Selenium](http://www.seleniumhq.org/download/) will be up and ready to accept clients at `http://localhost:4444/wd/hub`. The grid's available browsers can be viewed by opening the console at `http://localhost:4444/grid/console`.
If you are using Mac (OSX) or [Microsoft Windows](https://docs.docker.com/engine/installation/windows/) `localhost` won't work unless you are in Docker Beta (version >= 1.12) If you are using Docker version <= 1.11 please find out the correct IP through `docker-machine ip default`.

For more details see [here](https://github.com/elgalu/docker-selenium/blob/master/README.md#usage).

#### Docker-compose

You also can setup [Selenium](http://www.seleniumhq.org/download/) by provided [docker-compose.yml](https://github.com/elgalu/docker-selenium/blob/master/docs/docker-compose.md) 
config in [elgalu/docker-selenium](https://github.com/elgalu/docker-selenium) or by provided in [generator-garden](https://github.com/Dsazz/generator-garden) 
[docker-compose.yml](https://github.com/Dsazz/generator-garden/blob/master/generators/app/templates/docker-compose.yml), which you can install, if answer "YES" on related question.

### Official repo

Note [SeleniumHQ/docker-selenium](https://github.com/SeleniumHQ/docker-selenium) and [elgalu/docker-selenium](https://github.com/elgalu/docker-selenium)
share the same purpose however both projects have diverged considerably in the last two years, some major differences are:

* both browsers and also the grid are on the same container in this repo
* [elgalu/docker-selenium](https://github.com/elgalu/docker-selenium) support for [video recording](https://github.com/elgalu/docker-selenium/docs/videos.md)
* process manager: [elgalu/docker-selenium](https://github.com/elgalu/docker-selenium) image 
uses [supervisord](http://supervisord.org) while the official [uses bash](https://github.com/SeleniumHQ/docker-selenium/blob/master/StandaloneChromeDebug/entry_point.sh)


Manually
--------

### Ensure you have the minimum required Java version

With the release of Selenium 3+, the minimum required version of Java is 8.

If an older selenium version is needed, you can check the requirements on the [official Selenium changelog](https://raw.githubusercontent.com/SeleniumHQ/selenium/master/java/CHANGELOG).

Here is a reference sheet for the more recent Selenium version:

| Selenium version | Minimum Java Required |
|   ---   |   ---   |
| 3.0.0+  | Java 8  |
| 2.47.0+ | Java 7  |
| 2.22.0+ | Java 6  |

#### Step 1: Download selenium-server-standalone

You should download `selenium-server-standalone-<version>.jar` from [here](http://www.seleniumhq.org/download/).

#### Step 2: Start the hub

The Hub is the central point that will receive all the test request and distribute them the the right nodes.

Open a command prompt and navigate to the directory where you copied\downloaded the `selenium-server-standalone` file. 
Type the following command:

```bash
java -jar selenium-server-standalone-<version>.jar -role hub
```

The hub will automatically start-up using port `4444` by default. 
To change the default port, you can add the optional parameter -port when you run the command. 
You can view the status of the hub by opening a browser window and navigating to: `http://localhost:4444/grid/console`

#### Step 3: Start the nodes

Regardless on whether you want to run a grid with new WebDriver functionality, or a grid with Selenium 1 RC functionality, or both at the same time, you use the same selenium-server-standalone jar file to start the nodes.

```bash
java -jar selenium-server-standalone-<version>.jar -role node  -hub http://localhost:4444/grid/register
```

> Note: The port defaults to 5555 if not specified whenever the "-role" option is provided and is not hub.

For backwards compatibility "wd" and "rc" roles are still a valid subset of the "node" role. 
But those roles limit the types of remote connections to their corresponding API, while "node" allows both RC and WebDriver remote connections.
