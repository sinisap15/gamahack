import { type RecommendedResponse, RecommendedResponseList } from "../api/rest/v1/gen";
import { IBaseProtocol } from "pg-promise";
import { database, sqlFiles } from "./index";

export interface IRecommendedRepository {
  getRecommendedGames(pageSize: number): Promise<RecommendedResponseList>;

  getUserRecommendedGames(request: { playerId: string; pageSize?: number }): Promise<RecommendedResponseList>;
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

  getUserRecommendedGames = async (
    request: { playerId: string; pageSize?: number },
    tx: IBaseProtocol<unknown> = database
  ): Promise<RecommendedResponseList> => {
    const { playerId, pageSize } = request;
    const result = await tx.manyOrNone<RecommendedResponse>(sqlFiles.getUserRecommendedGames, { playerId, pageSize });

    return {
      values: result,
    };
  };
}
