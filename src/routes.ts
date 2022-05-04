
import express from 'express';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './domain/use-cases/submit-feedback';
import { PrismaFeedbacksRepository } from './infra/repositories/prisma/feedbacks-prisma';
import { prisma } from './prisma';

export const routes = express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5fe5fed1343bbd",
    pass: "2a051a5256660b"
  }
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository)

  await submitFeedbackUseCase.execute({ type, comment, screenshot })
  
  // await transport.sendMail({
  //   from: 'Equipe Feedget <oi@feedget.com>',
  //   to: 'Arthur Enrique <arthurenrique1512@gmail.com>',
  //   subject: 'Novo feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
  //     `<p>Tipo de feedback: ${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     `</div>`
  //   ].join('\n')
  // })

  return res.status(201).send('feedback submitted')
})
