
# Setup and build the client

FROM node:latest

RUN apt-get update

# create root directory for our project in the container
RUN mkdir /frontend

# set environment variables
ENV PATH="./node_modules/.bin:$PATH"

# Set the working directory.
WORKDIR /frontend

ADD . /frontend/

COPY package.json /frontend

RUN npm install --silent

EXPOSE 4000

# start app
CMD ["npm", "start"]

