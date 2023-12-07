import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { JoiUtil } from '@vite-ma-planete/config';

export interface DatabaseConfig {
  readUrl: string;
  writeUrl: string;
}

export const config = registerAs('keto', () =>
  JoiUtil.validate<DatabaseConfig>({
    readUrl: {
      value: process.env['KETO_READ_API_URL'],
      joi: Joi.string()
        .uri({
          scheme: ['https', 'http'],
        })
        .default(
          'http://keto.dev.vite-ma-planete.127.0.0.1.sslip.io/read'
        ),
    },
    writeUrl: {
      value: process.env['KETO_WRITE_API_URL'],
      joi: Joi.string()
        .uri({
          scheme: ['https', 'http'],
        })
        .default(
          'http://keto.dev.vite-ma-planete.127.0.0.1.sslip.io/write'
        ),
    },
  })
);
