export type SendMailDTO = {
  subject: string
  body: string
}

export interface ISendMailAdapter {
  sendMail({ subject, body }: SendMailDTO): Promise<void>
}