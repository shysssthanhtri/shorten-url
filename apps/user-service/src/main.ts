import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { ConfigService } from '@/config/config.service';

async function bootstrap() {
  await ConfigService.initialize();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(ConfigService.get('SERVICE_PREFIX'));

  await app.listen(ConfigService.get('PORT'), () => {
    console.log(`Listening on ${ConfigService.get('PORT')}: ...`);
  });
}
bootstrap();
