# Шаг 1: Сборка приложения
FROM node:16 AS build-stage
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все исходные файлы
COPY . .

# Сборка проекта
RUN npm run build

# Шаг 2: Настройка NGINX
FROM nginx:alpine AS production-stage

# Копируем файлы сборки из предыдущего этапа
COPY --from=build-stage /app/build /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем NGINX
CMD ["nginx", "-g", "daemon off;"]