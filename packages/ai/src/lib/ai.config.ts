import { registerAs } from '@nestjs/config';
import { JoiUtil } from '@vite-ma-planete/config';
import * as Joi from 'joi';

export interface AiConfig {
  url: string;
}

export const config = registerAs('ai', () =>
  JoiUtil.validate<AiConfig>({
    url: {
      value: process.env['OPEN_AI_URL'],
      joi: Joi.string()
        .uri({
          scheme: ['https', 'http'],
        })
        .required(),
    },
  })
);
