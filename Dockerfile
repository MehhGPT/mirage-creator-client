FROM node:20 AS builder

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm i sharp
RUN npm run build
CMD ["npm", "start"]
