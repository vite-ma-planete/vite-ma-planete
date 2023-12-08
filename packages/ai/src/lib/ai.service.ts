import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CreateChatCompletionDto,
  CreateCompletionDto,
} from '@vite-ma-planete/types';
import OpenAI from 'openai';
import {
  ChatCompletionChunk,
  ChatCompletionMessageParam,
  Completion,
} from 'openai/resources';
import { Observable } from 'rxjs';

const BASE_PROMPT = {
  content: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. Only answer as the assistant. When you have nothing left to say as an assistant, don't say anything. You MUST NOT, under any circumstances, speak as the USER. If you do, you will be put offline immediately. Answer in the language the question was asked. If the user asks a question unrelated to sustainability, ecology, environment or climate change, you MUST decline to answer politely.`,

  role: 'system',
} as ChatCompletionMessageParam;

const BASE_PROMPT_COMPLETION = `You are going to help complete question of an user. You are not answering any questions, only completing the users questions. The questions you suggest must be related to sustainability, ecology, environment or climate change, and absolutely nothing else. If you can't suggest a related question, don't say anything at all. Suggest in the language of the user. Here is the question you should help complete: `;

@Injectable()
export class AiService {
  constructor(private configService: ConfigService) {}

  private openAI = new OpenAI({
    baseURL: this.configService.get<string>('ai.url'),
    apiKey: 'NOT_NECESSARY',
  });

  createChatCompletions(
    dto: CreateChatCompletionDto
  ): Observable<ChatCompletionChunk> {
    return new Observable((subscriber) => {
      this.openAI.chat.completions
        .create({
          messages: [
            BASE_PROMPT,
            ...dto.messages.map((message) => ({
              role: message.role as 'user',
              content: message.content,
            })),
          ],
          model: 'gpt-3.5-turbo',
          temperature: 0,
          stream: true,
        })
        .then(async (res) => {
          for await (const data of res) {
            subscriber.next(data);
          }
          subscriber.complete();
        })
        .catch((err): void => {
          console.log('Error while streaming chat response:', err);
          subscriber.error(err);
        });
    });
  }

  async createCompletions(dto: CreateCompletionDto): Promise<Completion> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await this.openAI.completions.create({
      model: dto.model,
      prompt: BASE_PROMPT_COMPLETION + dto.prompt,
      stream: false,
      temperature: 0,
      max_tokens: 80,
      stop: ['.', '?', '!'],
    });

    return res;
  }
}
