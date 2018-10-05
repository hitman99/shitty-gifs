FROM node:10-alpine

WORKDIR /shitty-gifs
COPY . .
RUN npm install --production && npm i webpack webpack-cli &&  npm run build && npm remove webpack webpack-cli

CMD ["npm", "start"]