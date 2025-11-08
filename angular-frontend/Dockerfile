FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.23

COPY --from=build /app/dist/angular-frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
