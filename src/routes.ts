
import express from 'express';
import { SubmitFeedbackUseCase } from './domain/use-cases/submit-feedback';
import { NodemailerSendMailAdapter } from './infra/adapters/nodemailer';
import { PrismaFeedbacksRepository } from './infra/repositories/prisma/feedbacks-prisma';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerSendMailAdapter = new NodemailerSendMailAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository, 
    nodemailerSendMailAdapter
  )

  await submitFeedbackUseCase.execute({ type, comment, screenshot })

  return res.status(201).send('feedback submitted')
})
