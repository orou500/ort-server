FROM node:20.18.1-alpine AS builder

COPY ./ /server

WORKDIR /server
RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]