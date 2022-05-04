export type CreateFeedbackDTO = {
  type: string
  comment: string
  screenshot?: string
}

export interface IFeedbacksRepository {
  create({ type, comment, screenshot }: CreateFeedbackDTO): Promise<void>
}