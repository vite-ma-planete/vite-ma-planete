import { registerAs } from '@nestjs/config';
import { JoiUtil } from '@vite-ma-planete/config';
import * as Joi from 'joi';

export interface DatabaseConfig {
  url: string;
}

export const config = registerAs('database', () =>
  JoiUtil.validate<DatabaseConfig>({
    url: {
      value: process.env['DATABASE_URL'],
      joi: Joi.string().required(),
    },
  })
);
