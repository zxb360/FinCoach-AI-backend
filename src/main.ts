import { NestFactory } from '@nestjs/core';
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://projeto-financa-dio-1.onrender.com/',
      'http://localhost:5174',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // const corsOptions: CorsOptions = {
  //   origin: true,
  //   credentials: true,
  // };
  // app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
