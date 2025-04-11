import { FeedbackRepository, IFeedbackRepository } from "../../../src/persistence/feedbackRepository";
import { FeedbackService, IFeedbackService } from "../../../src/business/feedback/feedbackService";
import {
  FeedbackCreate,
  FeedbackCreateFeedbackTypeEnum,
  FeedbackCreateGameCategoryEnum,
} from "../../../src/api/rest/v1/gen";

describe("FeedbackService tests", () => {
  const feedbackRepository: IFeedbackRepository = new FeedbackRepository();
  const feedbackService: IFeedbackService = new FeedbackService(feedbackRepository);

  describe("createFeedback", () => {
    it("should create feedback", async () => {
      const feedbackCreate: FeedbackCreate = {
        feedbackType: FeedbackCreateFeedbackTypeEnum.GameLiked,
        gameId: 387,
        playerId: "ca2abc31-55b4-400a-9b35-cd456b5994f3",
        gameCategory: FeedbackCreateGameCategoryEnum.Blackjack,
        gameName: "Blackjack",
      };

      jest.spyOn(feedbackRepository, "createFeedback").mockResolvedValueOnce();

      await feedbackService.createFeedback({ feedbackCreate });
    });
  });
});
