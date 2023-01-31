FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build:dev

COPY dev.env dist/.env

ADD ./api-docs dist/api-docs

WORKDIR /usr/src/app/dist

CMD [ "node", "app/app.js" ]

EXPOSE 3000
