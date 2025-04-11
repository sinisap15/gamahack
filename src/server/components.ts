import { IRecommendedRepository, RecommendedRepository } from "../persistence/recommendedRepository";
import { RecommendedService } from "../business/recommended/recommendedService";

export const startServices = () => {
  const recommendedRepository: IRecommendedRepository = new RecommendedRepository();
  return { recommendedService: new RecommendedService(recommendedRepository) };
};
