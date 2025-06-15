FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install -g pm2
RUN npm install

EXPOSE 4000

CMD ["pm2-runtime", "ecosystem.config.js"]
