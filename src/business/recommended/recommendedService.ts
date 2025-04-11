import { RecommendedResponseList } from "../../api/rest/v1/gen";
import { IRecommendedRepository } from "../../persistence/recommendedRepository";

export interface IRecommendedService {
  getRecommendedGames(pageSize: number): Promise<RecommendedResponseList>;

  getUserRecommendedGames(request: { playerId: string; pageSize?: number }): Promise<RecommendedResponseList>;
}

export class RecommendedService implements IRecommendedService {
  constructor(private readonly recommendedRepository: IRecommendedRepository) {}

  async getRecommendedGames(pageSize: number): Promise<RecommendedResponseList> {
    return await this.recommendedRepository.getRecommendedGames(pageSize);
  }

  async getUserRecommendedGames(request: { playerId: string; pageSize?: number }): Promise<RecommendedResponseList> {
    return this.recommendedRepository.getUserRecommendedGames(request);
  }
}
