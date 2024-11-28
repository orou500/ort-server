FROM node:20.18.1

COPY ./ /server

WORKDIR /server
RUN npm install && npm index.js