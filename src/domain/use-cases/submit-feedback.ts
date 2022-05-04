import { ISendMailAdapter } from "../adapters/send-mail";
import { CreateFeedbackDTO, IFeedbacksRepository } from "../repositories/feedbacks";

export class SubmitFeedbackUseCase {
  constructor(
    private readonly feedbacksRepository: IFeedbacksRepository, 
    private readonly sendMailAdapter: ISendMailAdapter
  ) {}

  async execute({ type, comment, screenshot }: CreateFeedbackDTO): Promise<void> {
    await this.feedbacksRepository.create({ type, comment, screenshot });

    await this.sendMailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`
      ].join('\n')
    })
  }
}

