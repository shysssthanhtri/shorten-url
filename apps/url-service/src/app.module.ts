import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { UrlModule } from '@/modules/url/url.module';
import { getConnectionConfig } from '@/ormconfig';

@Module({
  imports: [
    UrlModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...getConnectionConfig(),
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
