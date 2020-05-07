[![Build Status](https://travis-ci.org/Arquisoft/viade_en2b.svg?branch=master)](https://travis-ci.org/Arquisoft/viade_en2b)
[![codecov](https://codecov.io/gh/Arquisoft/viade_en2b/branch/master/graph/badge.svg)](https://codecov.io/gh/Arquisoft/viade_en2b)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ef6c8a8c80ba43e89e91c977e994c4c5)](https://www.codacy.com/gh/Arquisoft/viade_en2b?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Arquisoft/viade_en2b&amp;utm_campaign=Badge_Grade)

# VIADE EN2b

This project is an assignment for the [Software Architecture course](https://arquisoft.github.io/) following [these requirements](https://labra.solid.community/public/SoftwareArchitecture/AssignmentDescription/).

The app is deployed at [https://arquisoft.github.io/viade_en2b/](https://arquisoft.github.io/viade_en2b/) which also contains a [technical documentation](https://arquisoft.github.io/viade_en2b/docs).

More information about how this project has evolved is available [in the wiki](https://github.com/Arquisoft/viade_en2b/wiki).

## Build the application in local with Docker

The following steps assume the reader to have a basic understanding of Docker mechanics and to have the Docker toolkit already installed in their machine.

### Get your local POD

This application can work with local Solid PODs. To be able to do so, clone this project and clone inside it the node-solid-server with:

```
git clone https://github.com/solid/node-solid-server
```

Change the Dockerfile inside node-solid-server with the following text for it to be compatible with the application:

```Dockerfile
FROM node:12.14.1
EXPOSE 8443
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
COPY config.json-default config.json
RUN openssl req \
    -new \
    -newkey rsa:4096 \
    -days 365 \
    -nodes \
    -x509 \
    -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com" \
    -keyout privkey.pem \
    -out fullchain.pem
CMD npm run solid start
```

Change in the file `config.json-default` the line `"multiuser": false` to `"multiuser": true`; this will make the server work, but only one user can be created. It is enough for testing purposes, but if multiple users are wanted in the POD, [instructions found in the node-solid-server repository](https://github.com/solid/node-solid-server#run-multi-user-server-intermediate) regarding multiuser mode have to be followed.

Once done, the image of the server can be built with the following command:

```
docker build -t solidserver .
```

The name `solidserver` can be changed. The containers can be run with the following command:

```
docker run --name solidserver --rm -d -p 8443:8443 solidserver
```

This command will remove the container once it is stopped. If this behaviour is not wanted, the `--rm` flag can be removed.

With this, the Solid server should be up and running, and can be accessed through the port 8443. To be able to use it, a user has to be registered.

**Important**: If a new user is added, in the hosts file of the machine running the server a new line has to be added for the user to be accessible. If a user with WebID `newuser.localhost` is added, the new line in the hosts file would be:

```
127.0.0.1 newuser.localhost
```

### Build the application

The application already comes with a Dockerfile prepared for it to be executed. It shouldn't need any change, although it is just for testing purposes as it executes the application in developer mode. If production mode is wanted, the Dockerfile of the application should be changed to something similar to the following:

```Dockerfile
FROM node:12.14.1
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
RUN npm install -g http-server
CMD http-server build -p 3000
```

The Apache server is put as an example, but it can of course be changed.

Once the Dockerfile is ready, the image can be built with:

```
docker build -t solidwebapp .
```

and run with:

```
docker run --name solidwebapp -it --rm -d -p 3000:3000 solidwebapp
```

### Run the two images

The application's repository comes with a prepared `docker-compose.yml` file which will run the images for the application and the node-solid-server. Note that if the locations of the files are not the same as the ones in this file, it will not work. This file also adds volumes for the Solid server, meaning that the data stored in it will be saved even after the container is stopped and removed. To run this file, use the following command:

```
docker-compose up -d
```

Both the server and the application should be up and running.