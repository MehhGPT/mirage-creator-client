FROM node:20 AS builder

WORKDIR /usr/src/app

COPY . .
RUN yarn install
RUN yarn add sharp
RUN yarn build
CMD ["yarn", "start"]