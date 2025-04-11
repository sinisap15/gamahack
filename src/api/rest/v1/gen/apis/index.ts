/* tslint:disable */
/* eslint-disable */
import { Express } from "express";
import { registerRestApiMiddleware, RestMiddlewareConfig } from "@gamingenius/lib_rest_api";
import { FeedbackApi, registerFeedbackApiResource, RecommendedApi, registerRecommendedApiResource, } from "./";

export * from './FeedbackApi';
export * from './RecommendedApi';

export function registerRecommendationServiceRestApiMiddleware(app: Express, implementations: {
    implFeedbackApi: FeedbackApi | null,
    implRecommendedApi: RecommendedApi | null,
}, config: RestMiddlewareConfig) {

    const basePath = "/recommendation/api/v1";

    registerRestApiMiddleware(app, config);

    // resource bindings
    registerFeedbackApiResource(basePath, app, implementations.implFeedbackApi);
    registerRecommendedApiResource(basePath, app, implementations.implRecommendedApi);
}
