FROM node:10-alpine

WORKDIR /shitty-gifs
COPY . .
RUN npm install --production

CMD ["npm", "start"]