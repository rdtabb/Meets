FROM node:15-alpine AS builder

WORKDIR /app

COPY package.json package.json 

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]
