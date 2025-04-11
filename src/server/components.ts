import { IRecommendedRepository, RecommendedRepository } from "../persistence/recommendedRepository";
import { RecommendedService } from "../business/recommended/recommendedService";
import { FeedbackRepository, IFeedbackRepository } from "../persistence/feedbackRepository";
import { FeedbackService } from "../business/feedback/feedbackService";

export const startServices = () => {
  const recommendedRepository: IRecommendedRepository = new RecommendedRepository();
  const feedbackRepository: IFeedbackRepository = new FeedbackRepository();
  return {
    recommendedService: new RecommendedService(recommendedRepository),
    feedbackService: new FeedbackService(feedbackRepository),
  };
};
