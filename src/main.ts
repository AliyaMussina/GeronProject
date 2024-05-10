import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Geron')
    .setDescription('test lessons')
    .setVersion('1.0')
    .addTag('geron')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // добавили валидацию внутрь нашего приложения
  app.useGlobalPipes(new ValidationPipe());
  // запуск сервер на 3000 порту
  await app.listen(3000);
}
bootstrap();