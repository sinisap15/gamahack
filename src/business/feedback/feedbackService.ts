import { FeedbackCreate } from "../../api/rest/v1/gen";
import { IFeedbackRepository } from "../../persistence/feedbackRepository";

export interface IFeedbackService {
  createFeedback(request: { feedbackCreate: FeedbackCreate }): Promise<void>;
}

export class FeedbackService {
  constructor(private readonly feedbackRepository: IFeedbackRepository) {}

  async createFeedback(request: { feedbackCreate: FeedbackCreate }): Promise<void> {
    await this.feedbackRepository.createFeedback(request);
  }
}
