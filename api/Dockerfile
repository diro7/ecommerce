FROM node:13.12.0-alpine
RUN apk add netcat-openbsd
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY wait-for ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./


# start app
CMD ["npm", "start"]
