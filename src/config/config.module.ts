import { Global, Module } from '@nestjs/common';
import { ConfigModule as CModule } from '@nestjs/config';
import configuration from './configuration';
@Global()
@Module({
  imports: [CModule.forRoot({ isGlobal: true, load: [configuration] })],
  exports: [CModule],
})
export class ConfigModule {}
