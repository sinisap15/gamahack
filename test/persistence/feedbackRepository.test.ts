import { database } from "../../src/persistence";
import { FeedbackRepository } from "../../src/persistence/feedbackRepository";
import {
  FeedbackCreate,
  FeedbackCreateFeedbackTypeEnum,
  FeedbackCreateGameCategoryEnum,
} from "../../src/api/rest/v1/gen";

const feedbackRepository = new FeedbackRepository();

describe("RecommendedRepository tests", () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  afterAll(async () => {
    await database.$pool.end();
  });

  describe("getRecommendedGames", () => {
    it("should return most liked games", async () => {
      const feedbackCreate: FeedbackCreate = {
        feedbackType: FeedbackCreateFeedbackTypeEnum.GameLiked,
        gameId: 387,
        playerId: "ca2abc31-55b4-400a-9b35-cd456b5994f3",
        gameCategory: FeedbackCreateGameCategoryEnum.Blackjack,
        gameName: "Blackjack",
      };
      await feedbackRepository.createFeedback({ feedbackCreate });

      const feedback = database.one(`SELECT * FROM games_feedback WHERE gameid = 387`);
      expect(feedback).toBeDefined();
    });
  });
});
