import { RecommendedRepository } from "../../src/persistence/recommendedRepository";
import { database } from "../../src/persistence";

const recommendedRepository = new RecommendedRepository();

describe("RecommendedRepository tests", () => {
  beforeEach(async () => {
    jest.resetAllMocks();
  });
  afterAll(async () => {
    await database.$pool.end();
  });

  describe("getRecommendedGames", () => {
    it("should return most liked games - pageSize 25", async () => {
      const result = await recommendedRepository.getRecommendedGames(25);
      expect(result).toBeDefined();
      expect(result.values.length).toEqual(25);
    });
  });

  describe("getUserRecommendedGames", () => {
    it("should return most liked games for player", async () => {
      const playerId = "ca2abc31-55b4-400a-9b35-cd456b5994f3";
      const result = await recommendedRepository.getUserRecommendedGames({ playerId });

      expect(result).toBeDefined();
    });
  });
});
