import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';
import { AppModule } from './app.module';
import { PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>(PORT);
  const logger = app.get<OgmaService>(OgmaService);

  await app.listen(port, async () => {
    logger.log(`Listening at ${await app.getUrl()}`);
  });
}
bootstrap();
