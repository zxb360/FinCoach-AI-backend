import { NestFactory } from '@nestjs/core';
// import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const corsOptions: CorsOptions = {
  //   origin: true,
  //   credentials: true,
  // };
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
