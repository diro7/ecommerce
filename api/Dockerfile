FROM node:13.12.0-alpine
RUN apk add netcat-openbsd bash
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
RUN ls
COPY wait-for-it.sh ./
COPY package-lock.json ./
RUN npm install
RUN npm install sequelize
RUN npm install sequelize-cli

# add app
COPY . ./


