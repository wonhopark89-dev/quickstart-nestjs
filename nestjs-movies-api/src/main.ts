import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // request 자체를 거절
      transform: true, // 자동으로 데이터 타입 변환가능
    }),
  );
  await app.listen(3000);
}
bootstrap();
