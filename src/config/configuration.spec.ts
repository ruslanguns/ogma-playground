import configuration from './configuration';

process.env = {
  PORT: '1234',
  NODE_ENV: 'testing',
  LOGS_IN_JSON_ENABLE: 'true',
  LOGS_DELETE_FREQUENCY_IN_HOURS: '10',
  LOGS_EXPRESS_PARSER_DISABLE: 'true',
};

describe('Config Namespaces', () => {
  it('should match the snapshot', () => {
    const configValues = configuration();
    expect(configValues).toMatchSnapshot();
  });

  it('should logging delete frecuency', () => {
    const {
      logging: { deleteFrecuency },
    } = configuration();
    expect(deleteFrecuency).toEqual(10);
  });

  describe('Feature flags', () => {
    it('should enable or disable the logging json format', () => {
      const {
        logging: { json },
      } = configuration();
      expect(json).toEqual(true);
    });

    it('should enable or disable the logging json format', () => {
      const {
        logging: { disableExpressParser },
      } = configuration();
      expect(disableExpressParser).toEqual(true);
    });
  });
});
