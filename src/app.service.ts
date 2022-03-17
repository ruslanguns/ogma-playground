import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { OgmaLoggerRequestScoped, OgmaService } from '@ogma/nestjs-module';

@Injectable()
export class AppService implements OnModuleInit, OnApplicationShutdown {
  constructor(
    // private readonly logger: OgmaService, // Comment the line bellow and uncomment this line to test
    @OgmaLoggerRequestScoped(AppService) private readonly logger: OgmaService,
  ) {}

  onModuleInit() {
    // TODO: IS THAT AN ISSUE?
    // onModuleInit is not triggered when OgmaLoggerRequestScoped is used
    console.log('This is not being triggered');
  }

  onApplicationShutdown(signal?: string) {
    // TODO: SIGINIT is not triggered when OgmaLoggerRequestScoped is used > Ctrl + C
    console.log('Shutdown signal received: ', signal);
  }

  getHello(): string {
    this.logger.info('Hello World!');
    return 'Hello World!';
  }
}
