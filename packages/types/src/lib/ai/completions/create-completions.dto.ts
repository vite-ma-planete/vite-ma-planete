import { IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

class Message {
  @ApiProperty({
    description: `The role of the message`,
    example: `Human`,
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    description: `The content of the message`,
    example: `Hello, how are you?`,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  content: string;
}

export class CreateChatCompletionDto {
  @ApiProperty({
    description: `The model to use for the chat`,
    example: `davinci`,
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: `The chat history`,
    example: [
      {
        role: 'Human',
        content: 'Hello, how are you?',
      },
      {
        role: 'AI',
        content: 'I am doing great, how about you?',
      },
    ],
    type: 'array',
    items: {
      $ref: getSchemaPath(Message),
    },
  })
  @ValidateNested({ each: true })
  @Type(() => Message)
  messages: Message[];
}
