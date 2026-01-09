FROM node:20-alpine

WORKDIR /app

# Установка зависимостей
COPY package.json package-lock.json ./
RUN npm ci

# Копируем всё (src + prisma)
COPY . .

# Генерация Prisma клиента уже после копирования
RUN npx prisma generate

# Сборка NestJS
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
