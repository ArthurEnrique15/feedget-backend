import { ISendMailAdapter, SendMailDTO } from "../adapters/send-mail";
import { CreateFeedbackDTO, IFeedbacksRepository } from "../repositories/feedbacks";
import { SubmitFeedbackUseCase } from "./submit-feedback";

function makeFeedbacksRepositoryStub(): IFeedbacksRepository {
  class FeedbacksRepositoryStub implements IFeedbacksRepository {
    create({ type, comment, screenshot }: CreateFeedbackDTO): Promise<void> {
      return Promise.resolve();
    }
  }

  return new FeedbacksRepositoryStub()
}

function makeSendMailAdapterStub(): ISendMailAdapter {
  class SendMailAdapterStub implements ISendMailAdapter {
    sendMail({ subject, body }: SendMailDTO): Promise<void> {
      return Promise.resolve();
    }
  }

  return new SendMailAdapterStub()
}

interface SutTypes {
  feedbacksRepositoryStub: IFeedbacksRepository;
  sendMailAdapterStub: ISendMailAdapter;
  sut: SubmitFeedbackUseCase;
}

function makeSut(): SutTypes {
  const feedbacksRepositoryStub = makeFeedbacksRepositoryStub()
  const sendMailAdapterStub = makeSendMailAdapterStub()
  const sut = new SubmitFeedbackUseCase(feedbacksRepositoryStub, sendMailAdapterStub);
  return { sut, feedbacksRepositoryStub, sendMailAdapterStub };
}

const validParams = {
  type: 'bug',
  comment: 'test comment',
  screenshot: 'data:image/png;base64,test'
}

describe('Submit feedback use case', () => {
  test('Should throw if type was not received', async () => {
    const { sut } = makeSut();
    const sutPromise = sut.execute({ 
      ...validParams, 
      type: undefined as unknown as string 
    });
    await expect(sutPromise).rejects.toThrow('Type is required');
  });

  test('Should throw if comment was not received', async () => {
    const { sut } = makeSut();
    const sutPromise = sut.execute({ 
      ...validParams, 
      comment: undefined as unknown as string 
    });
    await expect(sutPromise).rejects.toThrow('Comment is required');
  });

  test('Should throw if screenshot has an invalid format', async () => {
    const { sut } = makeSut();
    const sutPromise = sut.execute({ 
      ...validParams, 
      screenshot: 'invalid_screenshot_format' 
    });
    await expect(sutPromise).rejects.toThrow('Invalid screenshot format');
  });

  test('Should call FeedbacksRepository with correct values', async () => {
    const { sut, feedbacksRepositoryStub } = makeSut();
    const feedbacksRepositorySpy = jest.spyOn(feedbacksRepositoryStub, 'create');
    await sut.execute(validParams)
    expect(feedbacksRepositorySpy).toHaveBeenCalledWith(validParams)
  });
});
