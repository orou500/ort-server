FROM node:20.18.1

COPY ./ /server

WORKDIR /server
RUN npm install

EXPOSE 3000

CMD ["npm", "index.js"]