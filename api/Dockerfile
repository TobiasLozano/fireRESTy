FROM node:18

WORKDIR /api

COPY package.json package-lock.json ./
RUN npm install

COPY . .



EXPOSE 3000

CMD ["node", "index.js"]
