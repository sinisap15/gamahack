import bodyParser from "body-parser";
import express from "express";
import { config } from "./config";
import { registerRecommendationServiceRestApiMiddleware } from "./api/rest/v1/gen";
import { RecommendedApiImpl } from "./api/rest/v1/recommended/recommendedApiImpl";
import { startServices } from "./server/components";

(async () => {
  const services = startServices();
  const app = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use((req, res, next) => {
      console.log(req, res);
      next();
    })
    .get("/", (_, response) => {
      response.sendStatus(200);
    });
  registerRecommendationServiceRestApiMiddleware(
    app,
    {
      implFeedbackApi: null,
      implRecommendedApi: new RecommendedApiImpl(services.recommendedService),
    },
    {
      apiSpec: "spec/openapi.yaml",
      validateConfig: {
        skipApiSpecValidation: false,
        validateFormats: { mode: "fast", formats: ["uuid", "date", "date-time"] },
        skipLogResponseValidationErrors: false,
        skipRequestValidation: false,
      },
    }
  );

  app.listen(config.port, config.host, () => {
    console.log(`Internal Server listening on ${config.host}:${config.port}`);
  });
})().catch((error) => {
  console.error("Initialization error", error);
  process.exit(1);
});
