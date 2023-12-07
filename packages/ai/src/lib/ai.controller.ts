import { Body, Controller, RequestMethod } from '@nestjs/common';
import {
  ChatCompletionDto,
  CompletionDto,
  CreateChatCompletionDto,
  CreateCompletionDto,
} from '@vite-ma-planete/types';
import { ApiRouteAuthenticated } from '@vite-ma-planete/utils';
import { AiService } from './ai.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @ApiRouteAuthenticated({
    method: RequestMethod.POST,
    path: '/chat/completions',
    operation: {
      summary: 'Chat with the AI',
      description: 'Chat with the AI to get a response from a chat history',
    },
    response: {
      status: 200,
      type: ChatCompletionDto,
    },
  })
  createChatCompletions(
    @Body() body: CreateChatCompletionDto
  ): Promise<ChatCompletionDto> {
    return this.aiService.createChatCompletions(body);
  }

  @ApiRouteAuthenticated({
    method: RequestMethod.POST,
    path: '/completions',
    operation: {
      summary: 'Get a completion',
      description: 'Get a completion from a prompt',
    },
    response: {
      status: 200,
      type: CompletionDto,
    },
  })
  createCompletions(@Body() body: CreateCompletionDto): Promise<CompletionDto> {
    return this.aiService.createCompletions(body);
  }
}
