import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { ConfigService } from '@/config/config.service';

async function bootstrap() {
  await ConfigService.initialize();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(ConfigService.get('SERVICE_PREFIX'));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(ConfigService.get('PORT'), () => {
    console.log(`Listening on ${ConfigService.get('PORT')}: ...`);
  });
}
bootstrap();
