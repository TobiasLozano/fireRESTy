FROM node:18 AS frontend
WORKDIR /app/app
COPY app/package*.json ./
RUN npm install
COPY app/ ./
RUN npm run build

FROM node:18
WORKDIR /app/api
COPY api/package*.json ./
RUN npm install
COPY api/ ./

COPY --from=frontend /app/app/dist ./public
RUN mkdir -p /data && chown -R node:node /data
EXPOSE 3000
CMD ["node", "index.js"]