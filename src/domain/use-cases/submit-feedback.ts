import { CreateFeedbackDTO, IFeedbacksRepository } from "../repositories/feedbacks";

export class SubmitFeedbackUseCase {
  constructor(private readonly feedbacksRepository: IFeedbacksRepository) {}

  async execute({ type, comment, screenshot }: CreateFeedbackDTO): Promise<void> {
    await this.feedbacksRepository.create({ type, comment, screenshot });
  }
}