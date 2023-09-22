import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173'],
    allowedHeaders: 'Content-Type, Accept',
    methods: 'GET,PUT,POST,DELETE',
  });
  app.useBodyParser('json',  { limit: '10mb' });
  await app.listen(3000);
}
bootstrap();
