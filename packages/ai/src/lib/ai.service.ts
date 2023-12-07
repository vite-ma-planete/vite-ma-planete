import { Injectable } from '@nestjs/common';
import {
  ChatCompletionDto,
  CompletionDto,
  CreateChatCompletionDto,
  CreateCompletionDto,
} from '@vite-ma-planete/types';

@Injectable()
export class AiService {
  async createChatCompletions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dto: CreateChatCompletionDto
  ): Promise<ChatCompletionDto> {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createCompletions(dto: CreateCompletionDto): Promise<CompletionDto> {
    throw new Error('Not implemented');
  }
}
