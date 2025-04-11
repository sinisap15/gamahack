import { type RecommendedResponse, RecommendedResponseList } from "../api/rest/v1/gen";
import { IBaseProtocol } from "pg-promise";
import { database } from "../database/database";
import { sqlFiles } from "./index";

export interface IRecommendedRepository {
  getRecommendedGames(pageSize: number): Promise<RecommendedResponseList>;
}

export class RecommendedRepository implements IRecommendedRepository {
  getRecommendedGames = async (
    pageSize: number,
    tx: IBaseProtocol<unknown> = database
  ): Promise<RecommendedResponseList> => {
    const result = await tx.manyOrNone<RecommendedResponse>(sqlFiles.getRecommendedGames, { pageSize });

    return {
      values: result,
    };
  };
}
