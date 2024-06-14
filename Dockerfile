FROM node:alpine3.18

WORKDIR /urs/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 80

CMD ["yarn", "start"]