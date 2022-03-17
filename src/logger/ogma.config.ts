import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressParser } from '@ogma/platform-express';
import { ModuleConfigFactory } from '@golevelup/nestjs-modules';
import { OgmaModuleOptions } from '@ogma/nestjs-module';
import { createStream } from 'rotating-file-stream';
import {
  APPLICATION_NAME,
  ENV,
  LOGS_EXPRESS_PARSER_DISABLE,
  LOGS_IN_JSON_ENABLE,
} from '../config/constants';

/**
 * Function for generating file names and their directories
 *
 * @param time {Date}
 * @param index {number}
 * @returns {string} Formatted file name
 */
const fileNameGenerator = (time: Date, index: number): string => {
  const pad = (number: number) => (number > 9 ? '' : '0') + number;
  if (!time) return 'file.log';

  const month = time.getFullYear() + '' + pad(time.getMonth() + 1);
  const day = pad(time.getDate());

  return `${month}/${month}${day}-${index}-file.log`;
};

@Injectable()
export class OgmaModuleConfig
  implements ModuleConfigFactory<OgmaModuleOptions>
{
  constructor(private readonly config: ConfigService) {}

  createModuleConfig(): OgmaModuleOptions {
    const appName = this.config.get<string>(APPLICATION_NAME);
    const appEnv = this.config.get<string>(ENV);
    const jsonEnabled = this.config.get<boolean>(LOGS_IN_JSON_ENABLE);
    const expressParserDisabled = this.config.get<boolean>(
      LOGS_EXPRESS_PARSER_DISABLE,
    );

    return {
      service: {
        logLevel: 'ALL',
        application: `${appName} - ${appEnv}`,
        json: jsonEnabled,
        stream: createStream(fileNameGenerator, {
          interval: '1d',
          intervalBoundary: true,
          initialRotation: true,
          size: '10M',
          path: 'logs',
          teeToStdout: true,
        }),
      },
      interceptor: {
        http: expressParserDisabled ? false : ExpressParser,
      },
    };
  }
}
