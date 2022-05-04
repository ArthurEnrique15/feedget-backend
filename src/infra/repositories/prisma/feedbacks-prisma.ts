import { CreateFeedbackDTO, IFeedbacksRepository } from "../../../domain/repositories/feedbacks";
import { prisma } from "../../../prisma";

export class PrismaFeedbacksRepository implements IFeedbacksRepository {
  async create({ type, comment, screenshot }: CreateFeedbackDTO): Promise<void> {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  }
}