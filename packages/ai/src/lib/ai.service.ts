import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CreateChatCompletionDto,
  CreateCompletionDto,
} from '@vite-ma-planete/types';
import OpenAI from 'openai';
import { ChatCompletionChunk, Completion } from 'openai/resources';
import { Observable } from 'rxjs';

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
          messages: dto.messages.map((message) => ({
            role: message.role as 'user',
            content: message.content,
          })),
          model: 'gpt-3.5-turbo',
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

  createCompletions(dto: CreateCompletionDto): Observable<Completion> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new Observable((subscriber) => {
      this.openAI.completions
        .create({
          model: dto.model,
          prompt: dto.prompt,
          stream: true,
          max_tokens: 2000,
        })
        .then(async (res) => {
          for await (const data of res) {
            console.log('data', data);
            subscriber.next(data);
          }
          subscriber.complete();
        })
        .catch((err): void => {
          console.log('Error while streaming completion response:', err);
          subscriber.error(err);
        });
    });
  }
}
