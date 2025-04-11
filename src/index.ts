import bodyParser from "body-parser";
import express from "express";
import { config } from "./config";

(async () => {
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

  app.listen(config.port, config.host, () => {
    console.log(`Internal Server listening on ${config.host}:${config.port}`);
  });

})().catch((error) => {
  console.error("Initialization error", error);
  process.exit(1);
});
