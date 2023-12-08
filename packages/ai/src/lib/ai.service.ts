import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CreateChatCompletionDto,
  CreateCompletionDto,
} from '@vite-ma-planete/types';
import OpenAI from 'openai';
import {
  ChatCompletion,
  ChatCompletionChunk,
  Completion,
} from 'openai/resources';
import { Observable } from 'rxjs';

const BASE_PROMPT = {
  role: 'system' as 'role',
  content:
    "Tu es un assistant virtuel qui aide les gens à répondre à des questions liés à la transition écologique. Ne répond qu'aux questions liés à la transition écologique. Si l'utilisateur ne pose pas de question, réponds par une question. Si l'utilisateur ne pose pas une question lié à la transition écologique, décline gentiment de répondre à la question. Répond dans la langue de l'utilisateur. Ne répond seulement en tant qu'assistant. Ne continue jamais la conversation en tant que USER. Si tu n'as plus rien a dire en temps qu'assistant, arrête de parler.",
} as unknown as OpenAI.ChatCompletionMessageParam;

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

  async createChatCompletionsNoStream(
    body: CreateChatCompletionDto
  ): Promise<ChatCompletion> {
    const response = await this.openAI.chat.completions.create({
      messages: [
        BASE_PROMPT,
        ...(body.messages ? body.messages : [])
          .filter((message) => message.role !== 'system')
          .map((message) => ({
            role: message.role as 'user',
            content: message.content,
          })),
      ],
      model: 'davinci',
      max_tokens: 200,
    });

    return response;
  }

  createCompletions(dto: CreateCompletionDto): Observable<Completion> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return new Observable((subscriber) => {
      this.openAI.completions
        .create({
          model: dto.model || '',
          prompt: dto.prompt,
          stream: true,
          max_tokens: 2000,
        })
        .then(async (res) => {
          for await (const data of res) {
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
