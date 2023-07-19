import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);

  // const allowedOrigins: (string | RegExp)[] = [];

  // allowedOrigins.push('https://localhost:3000');
  // allowedOrigins.push('https://concept-cove.vercel.app');

  // app.enableCors({
  //   origin: allowedOrigins,
  //   methods: ['GET', 'POST', 'OPTIONS'],
  //   allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  //   credentials: true,
  //   maxAge: 3600,
  // });
}
bootstrap();
