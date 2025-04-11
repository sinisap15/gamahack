import { RecommendedResponseList } from "../../../src/api/rest/v1/gen";
import { IRecommendedRepository, RecommendedRepository } from "../../../src/persistence/recommendedRepository";
import { IRecommendedService, RecommendedService } from "../../../src/business/recommended/recommendedService";

describe("FeedbackService tests", () => {
  const recommendedRepository: IRecommendedRepository = new RecommendedRepository();
  const recommendedService: IRecommendedService = new RecommendedService(recommendedRepository);

  describe("getRecommendedGames", () => {
    it("should return game recommendations", async () => {
      const fakeGameRecommendationList: RecommendedResponseList = {
        values: [
          {
            gameId: 1,
            score: 102,
            gameName: "Test1",
          },
          {
            gameId: 2,
            score: 44,
            gameName: "Test2",
          },
          {
            gameId: 3,
            score: 72,
            gameName: "Test3",
          },
          {
            gameId: 4,
            score: 61,
            gameName: "Test4",
          },
        ],
      };

      jest.spyOn(recommendedRepository, "getRecommendedGames").mockResolvedValueOnce(fakeGameRecommendationList);

      const result = await recommendedService.getRecommendedGames(25);
      expect(result).toBeDefined();
      expect(result.values.length).toEqual(4);
    });
  });

  describe("getRecommendedGames", () => {
    it("should return game recommendations", async () => {
      const playerId = "ca2abc31-55b4-400a-9b35-cd456b5994f3";
      const fakeGameRecommendationList: RecommendedResponseList = {
        values: [
          {
            gameId: 1,
            score: 102,
            gameName: "Test1",
          },
          {
            gameId: 2,
            score: 44,
            gameName: "Test2",
          },
          {
            gameId: 3,
            score: 72,
            gameName: "Test3",
          },
          {
            gameId: 4,
            score: 61,
            gameName: "Test4",
          },
        ],
      };

      jest.spyOn(recommendedRepository, "getUserRecommendedGames").mockResolvedValueOnce(fakeGameRecommendationList);

      const result = await recommendedService.getUserRecommendedGames({ playerId, pageSize: 25 });
      expect(result).toBeDefined();
      expect(result.values.length).toEqual(4);
    });
  });
});
