FROM node:10.14.1-alpine

COPY ./package.json /website/package.json
COPY ./package-lock.json /website/package-lock.json
WORKDIR /website
RUN npm install
