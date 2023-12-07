import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { config } from './ai.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forFeature(config)],
  controllers: [AiController],
  providers: [AiService],
  exports: [],
})
export class AiModule {}
