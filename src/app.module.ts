import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    OgmaModule.forFeatures([
      { context: AppService, options: { addRequestId: true } },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
