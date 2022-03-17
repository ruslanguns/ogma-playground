import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import {
  APPLICATION_NAME,
  ENV,
  LOGS_IN_JSON_ENABLE,
} from '../config/constants';
import { OgmaModuleConfig } from './ogma.config';

const configServiceFixture = {
  get: (env: string) => {
    switch (env) {
      case ENV:
        return 'testing';
      case APPLICATION_NAME:
        return 'OgmaDemo';
      case LOGS_IN_JSON_ENABLE:
        return true;
    }
  },
};

describe('OgmaService', () => {
  let service: OgmaModuleConfig;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OgmaModuleConfig,
        { provide: ConfigService, useValue: configServiceFixture },
      ],
    }).compile();

    service = module.get<OgmaModuleConfig>(OgmaModuleConfig);
  });

  describe('Ogma configuration', () => {
    it('should match the snapshot', () => {
      const ogmaConfig = service.createModuleConfig();
      expect(ogmaConfig).toMatchObject({
        interceptor: { http: expect.anything() },
        service: {
          application: 'OgmaDemo - testing',
          json: true,
          logLevel: 'ALL',
          stream: {
            options: {
              initialRotation: true,
              interval: {
                num: 1,
                unit: 'd',
              },
              intervalBoundary: true,
              path: 'logs/',
              size: 10485760,
              teeToStdout: true,
            },
          },
        },
      });
    });
  });
});
