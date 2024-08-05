FROM node:21-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript

EXPOSE 4000

CMD ["npx", "ts-node", "app.ts"]
