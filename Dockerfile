FROM node:16

WORKDIR /code

ENV PORT 80

COPY package.json /code/package.json

RUN yarn install

COPY . /code/

CMD [ "node", "src/index.js" ]