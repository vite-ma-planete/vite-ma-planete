import { Body, Controller, RequestMethod, Sse } from '@nestjs/common';
import {
  CreateChatCompletionDto,
  CreateCompletionDto,
} from '@vite-ma-planete/types';
import { ApiRoute } from '@vite-ma-planete/utils';
import { AiService } from './ai.service';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ChatCompletionChunk, Completion } from 'openai/resources';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @ApiRoute({
    method: RequestMethod.POST,
    path: '/chat/completions',
    operation: {
      summary: 'Chat with the AI',
      description:
        'Chat with the AI to get a response from a chat history. Streaming is mandatory.',
    },
    response: {
      status: 200,
    },
  })
  @Sse()
  createChatCompletions(
    @Body() body: CreateChatCompletionDto
  ): Observable<ChatCompletionChunk> {
    return this.aiService.createChatCompletions(body);
  }

  @ApiRoute({
    method: RequestMethod.POST,
    path: '/completions',
    operation: {
      summary: 'Get a completion',
      description: 'Get a completion from a prompt. Streaming is mandatory.',
    },
    response: {
      status: 200,
    },
  })
  async createCompletions(
    @Body() body: CreateCompletionDto
  ): Promise<Completion> {
    return this.aiService.createCompletions(body);
  }
}
