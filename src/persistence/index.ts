import { IQueryFileOptions, QueryFile } from "pg-promise";

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
