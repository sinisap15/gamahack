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
