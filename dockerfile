FROM node:16.1.0-alpine

WORKDIR /app

ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm ci

ADD . .

RUN npm run build

ENV NODE_ENV production

CMD npm run start
