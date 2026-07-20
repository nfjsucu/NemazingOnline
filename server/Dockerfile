FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY . .

ENV PORT=4000
ENV JWT_SECRET=nemazing-dev-secret-change-me
ENV DB_PATH=/app/data/nemazing.json

RUN mkdir -p /app/data

EXPOSE 4000

CMD ["node", "index.js"]
