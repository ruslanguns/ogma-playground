/**
 * Application port
 * @example 3000
 * @default 3000
 */
export const PORT = 'port';

/**
 * Environment name
 * @example (development, production, stagging, testing)
 */
export const ENV = 'env';

/**
 * Aplication name
 */
export const APPLICATION_NAME = 'applicationName';

/**
 * Logging json format enable feature flag
 * @example true
 */
export const LOGS_IN_JSON_ENABLE = 'logging.json';

/**
 * Logging delete frequency in hours
 * @example 10
 * @default 96
 */
export const LOGS_DELETE_FREQUENCY_IN_HOURS = 'logging.deleteFrecuency';

/**
 * Logging disable express interceptor
 * @example true
 * @default false
 */
export const LOGS_EXPRESS_PARSER_DISABLE = 'logging.disableExpressParser';
