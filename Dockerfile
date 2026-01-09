FROM node:20-alpine

WORKDIR /app

# Установка зависимостей
COPY package.json package-lock.json ./
RUN npm ci

# Prisma
COPY prisma ./prisma
RUN npx prisma generate

# Исходники
COPY . .

# Сборка NestJS
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]