export default () => ({
  port: +process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  applicationName: 'OgmaDemo',
  logging: {
    json: process.env.LOGS_IN_JSON_ENABLE === 'true',
    deleteFrecuency: +process.env.LOGS_DELETE_FREQUENCY_IN_HOURS || 96,
    disableExpressParser: process.env.LOGS_EXPRESS_PARSER_DISABLE === 'true',
  },
});
