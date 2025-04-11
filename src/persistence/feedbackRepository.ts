import { FeedbackCreate } from "../api/rest/v1/gen";
import { IBaseProtocol } from "pg-promise";
import { database } from "../database/database";
import { sqlFiles } from "./index";

export interface IFeedbackRepository {
  createFeedback(request: { feedbackCreate: FeedbackCreate }): Promise<void>;
}

export class FeedbackRepository implements IFeedbackRepository {
  createFeedback = async (
    request: { feedbackCreate: FeedbackCreate },
    tx: IBaseProtocol<unknown> = database
  ): Promise<void> => {
    await tx.none(sqlFiles.createFeedback, request);
  };
}
