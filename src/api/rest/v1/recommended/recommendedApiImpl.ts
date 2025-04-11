import { RecommendedApi, RecommendedResponseList } from "../gen";
import { ApiRequestContext } from "@gamingenius/lib_rest_api";
import { IRecommendedService } from "../../../../business/recommended/recommendedService";

export class RecommendedApiImpl implements RecommendedApi {
  constructor(private readonly recommendedService: IRecommendedService) {}
  getRecommendedGames = async (
    _: ApiRequestContext,
    request: { pageSize?: number }
  ): Promise<RecommendedResponseList> => {
    const { pageSize } = request;

    return this.recommendedService.getRecommendedGames(pageSize);
  };

  getUserRecommendedGames = async (
    _: ApiRequestContext,
    request: {
      playerId: string;
      pageSize?: number;
    }
  ): Promise<RecommendedResponseList> => {
    return this.recommendedService.getUserRecommendedGames(request);
  };
}
