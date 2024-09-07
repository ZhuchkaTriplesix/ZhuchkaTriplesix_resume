# Базовый образ для сборки Vue.js-приложения
FROM node:16 as build-stage

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Сборка приложения
RUN npm run build

# Базовый образ для Nginx
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html


COPY ./index.html /usr/share/nginx/html/
COPY ./style.css /usr/share/nginx/html/
COPY ./app.js /usr/share/nginx/html/

# Конфигурация Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
