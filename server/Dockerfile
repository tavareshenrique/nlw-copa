FROM node:18-alpine

WORKDIR /usr/src/app

RUN rm -rf node_modules

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start"]