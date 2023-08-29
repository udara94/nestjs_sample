import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`${process.env.NODE_ENV}/api`);
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
