import { FeedbackApi, FeedbackCreate } from "../gen";
import { ApiRequestContext } from "@gamingenius/lib_rest_api";
import { IFeedbackService } from "../../../../business/feedback/feedbackService";

export class FeedbackApiImpl implements FeedbackApi {
  constructor(private readonly feedbackService: IFeedbackService) {}

  createFeedback = async (_: ApiRequestContext, request: { feedbackCreate: FeedbackCreate }): Promise<void> => {
    await this.feedbackService.createFeedback(request);
  };
}
