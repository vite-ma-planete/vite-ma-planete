import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompletionDto {
  @ApiProperty({
    description: `The model to use for the chat`,
    example: `davinci`,
  })
  @IsString()
  model: string;

  @ApiProperty({
    description: `The prompt to use for the chat`,
    example: `Hello, how are you?`,
  })
  @IsString()
  prompt: string;

  @ApiProperty({
    description: `Wether or not to stream the response`,
    example: false,
  })
  @IsBoolean()
  stream: boolean;
}
