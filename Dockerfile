FROM node:alpine

RUN mkdir /app
COPY dist /app/dist/
COPY node_modules /app/node_modules/
COPY package.json /app/

ENTRYPOINT [ "node", "/app/dist/index.js" ]