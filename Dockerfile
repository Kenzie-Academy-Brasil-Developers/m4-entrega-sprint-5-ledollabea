FROM node:16.15.1

WORKDIR /app

COPY "package.json" .

RUN yarn

COPY . /app

CMD ["yarn", "run", "dev"]