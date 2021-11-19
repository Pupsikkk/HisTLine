import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from 'swagger-ui-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('HisTLine')
    .setDescription('Курсова робота, а ще просто цікавий проект)')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.listen(PORT, () => console.log(`Server starts on ${PORT}!!!`));
}

start();
