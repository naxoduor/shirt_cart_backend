FROM node:16.14.2
RUN mkdir -p /usr/app/src
WORKDIR /usr/app/src

COPY package*.json ./

RUN npm config set strict-ssl false
RUN npm install

COPY . .

EXPOSE 8081
CMD [ "node", "app.js"]