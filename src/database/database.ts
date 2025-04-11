import pgPromise, { IDatabase, IMain } from "pg-promise";

import { config } from "../config";

const initOptions: pgPromise.IInitOptions = {
  error(error: unknown, context: pgPromise.IEventContext) {
    console.error(JSON.stringify(error));
    console.error(context.query);
  },
};
export const pgp: IMain = pgPromise(initOptions);

export const database: IDatabase<unknown> = pgp(config.database);
