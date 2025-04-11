interface ApplicationConfiguration {
  database: {
    database: string;
    host: string;
    port: number;
    user: string;
    password: string;
  };
  serviceName: string;
  host: string;
  port: number;
  enableDbLogs: boolean;
  vetoBridgeUrl: string;
  vetoUsername: string;
  vetoPassword: string;
  vetoCheckOnLoginTimeoutSeconds: number;
  vetoCheckOnRegistrationEnabled: boolean;
  vetoCheckOnRegistrationMatchFnName: string;
  vetoCheckOnLoginOptimizationEnabled: boolean;
  vetoCheckOnLoginEnabled: boolean;
  vetoCheckOnLoginMatchFnName: string;
  manualVetoCheckEnabled: boolean;
  manualVetoCheckMatchFnName: string;
  playerCardUpdateVetoCheckEnabled: boolean;
  playerCardUpdateVetoCheckMatchFnName: string;
  ubiidVetoCheckEnabled: boolean;
  ubiidVetoCheckMatchFnName: string;
  rabbitMQ: {
    host: string;
    port: number;
    user: string;
    pass: string;
    vhost: string;
    protocol: string;
  };
  logRedactionPaths: string[];
}

export const config: ApplicationConfiguration = {
  database: {
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    database: String(process.env.DB_NAME),
    user: String(process.env.DB_USER),
    password: String(process.env.DB_PASS),
  },
  serviceName: process.env.SERVICE_NAME,
  host: process.env.HOST,
  port: Number(process.env.PORT),
  enableDbLogs: process.env.ENABLE_DB_LOGS ? process.env.ENABLE_DB_LOGS.toLowerCase() === "true" : false,
  vetoBridgeUrl: process.env.VETO_BRIDGE_URL,
  vetoUsername: process.env.VETO_USERNAME,
  vetoPassword: process.env.VETO_PASSWORD,
  vetoCheckOnLoginTimeoutSeconds: Number(process.env.VETO_CHECK_ON_LOGIN_TIMEOUT_SECONDS),
  vetoCheckOnRegistrationEnabled: process.env.VETO_CHECK_ON_REGISTRATION_ENABLED ? process.env.VETO_CHECK_ON_REGISTRATION_ENABLED.toLowerCase() === "true" : false,
  vetoCheckOnRegistrationMatchFnName: process.env.VETO_CHECK_ON_REGISTRATION_MATCH_FN_NAME,
  vetoCheckOnLoginOptimizationEnabled: process.env.VETO_CHECK_ON_LOGIN_OPTIMIZATION_ENABLED ? process.env.VETO_CHECK_ON_LOGIN_OPTIMIZATION_ENABLED.toLowerCase() === "true" : false,
  vetoCheckOnLoginEnabled: process.env.VETO_CHECK_ON_LOGIN_ENABLED ? process.env.VETO_CHECK_ON_LOGIN_ENABLED.toLowerCase() === "true" : false,
  vetoCheckOnLoginMatchFnName: process.env.VETO_CHECK_ON_LOGIN_MATCH_FN_NAME,
  manualVetoCheckEnabled: process.env.MANUAL_VETO_CHECK_ENABLED ? process.env.MANUAL_VETO_CHECK_ENABLED.toLowerCase() === "true" : false,
  manualVetoCheckMatchFnName: process.env.MANUAL_VETO_CHECK_MATCH_FN_NAME,
  playerCardUpdateVetoCheckEnabled: process.env.PLAYER_CARD_UPDATE_VETO_CHECK_ENABLED ? process.env.PLAYER_CARD_UPDATE_VETO_CHECK_ENABLED.toLowerCase() === "true" : false,
  playerCardUpdateVetoCheckMatchFnName: process.env.PLAYER_CARD_UPDATE_VETO_CHECK_MATCH_FN_NAME,
  ubiidVetoCheckEnabled: process.env.UBIID_VETO_CHECK_ENABLED ? process.env.UBIID_VETO_CHECK_ENABLED.toLowerCase() === "true" : false,
  ubiidVetoCheckMatchFnName: process.env.UBIID_VETO_CHECK_MATCH_FN_NAME,
  rabbitMQ: {
    protocol: process.env.RABBITMQ_PROTOCOL,
    host: process.env.RABBITMQ_HOST,
    port: Number(process.env.RABBITMQ_PORT),
    user: process.env.RABBITMQ_USER,
    pass: process.env.RABBITMQ_PASS,
    vhost: process.env.RABBITMQ_VHOST,
  },
  logRedactionPaths: JSON.parse(process.env.LOG_REDACTION_PATHS),
}

/**
 * Recursively iterates through object, validating the config.
 * If an env var is undefined (not set in configuration) or is configured incorrectly (e.g. something that should be a number is a string), throw to exit the app.*
 */
const findBadConfigVariable = (object: ApplicationConfiguration): void => {
  for (const key of Object.keys(object)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value: unknown = object[key];
    if (value && typeof value === "object" && value.constructor === Object) {
      findBadConfigVariable(value as ApplicationConfiguration);
    } else if (typeof value === "undefined" || (typeof value === "number" && Number.isNaN(value))) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Environment variable ${key} is undefined or configured incorrectly; value: ${value}`);
    }
  }
};

/**
 * Checks if all environment variables are set, throws if any is undefined.
 */
(() => {
  findBadConfigVariable(config);
})();
