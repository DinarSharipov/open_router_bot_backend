import { Injectable, NestMiddleware, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module.js';

// Middleware для проверки Authorization-Token
@Injectable()
class AuthTokenMiddleware implements NestMiddleware {
  use(this: void, req: Request, res: Response, next: NextFunction) {
    // Пропускаем Swagger UI и документацию
    if (req.path.startsWith('/api') || req.path.startsWith('/api-json')) {
      return next();
    }

    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token || token !== process.env.AUTH_TOKEN) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: invalid or missing token' });
    }
    next();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Применяем middleware ко всем маршрутам
  app.use(new AuthTokenMiddleware().use);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Open Router Backend')
    .setDescription('API for Telegram bot with LLM models')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
      },
      'api-token', // имя security схемы
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // сохраняет токен после ввода
    },
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
