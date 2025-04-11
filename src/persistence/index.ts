import { IQueryFileOptions, QueryFile } from "pg-promise";
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

export const sqlFiles = {
  getRecommendedGames: sql("getRecommendedGames.sql"),
  getUserRecommendedGames: sql("getRecommendedGamesByPlayer.sql"),
  createFeedback: sql("createFeedback.sql"),
};

function sql(file: string): QueryFile {
  const fullPath: string = __dirname + "/sql/" + file;

  const options: IQueryFileOptions = {
    // minifying the SQL is always advised;
    compress: true,
    minify: true,
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
}
