FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build:prod

RUN npx ng build user-portal --configuration production || echo "user-portal build skipped"

RUN npm install -g http-server

EXPOSE 4000

CMD ["http-server", "dist", "-p", "4000", "-c-1", "--cors"]