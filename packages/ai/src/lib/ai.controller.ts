import { Body, Controller, RequestMethod, Sse } from '@nestjs/common';
import {
  CreateChatCompletionDto,
  CreateCompletionDto,
} from '@vite-ma-planete/types';
import { ApiRouteAuthenticated } from '@vite-ma-planete/utils';
import { AiService } from './ai.service';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  ChatCompletion,
  ChatCompletionChunk,
  Completion,
} from 'openai/resources';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @ApiRouteAuthenticated({
    method: RequestMethod.POST,
    path: '/chat/completions/no-stream',
    operation: {
      summary: 'Chat with the AI',
      description:
        'Chat with the AI to get a response from a chat history. Streaming is mandatory.',
    },
    response: {
      status: 200,
    },
  })
  async createChatCompletionsNoStream(
    @Body() body: CreateChatCompletionDto
  ): Promise<ChatCompletion> {
    return await this.aiService.createChatCompletionsNoStream(body);
  }

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

  @ApiRouteAuthenticated({
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
  @Sse()
  createCompletions(@Body() body: CreateCompletionDto): Observable<Completion> {
    return this.aiService.createCompletions(body);
  }
}
