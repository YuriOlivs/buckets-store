import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ResponseInterceptor } from './common/interceptor/response-interceptor.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, //exclui campos fora dos mapeados pelas classes criadas
      forbidNonWhitelisted: true, //lança um erro para esses campos não mapeados
    })
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
