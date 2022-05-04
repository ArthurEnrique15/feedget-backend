import nodemailer from 'nodemailer';

import { ISendMailAdapter, SendMailDTO } from "../../domain/adapters/send-mail";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5fe5fed1343bbd",
    pass: "2a051a5256660b"
  }
});

export class NodemailerSendMailAdapter implements ISendMailAdapter {
  async sendMail({ subject, body }: SendMailDTO): Promise<void> {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Arthur Enrique <arthurenrique1512@gmail.com>',
      subject,
      html: body
    })
  }
}