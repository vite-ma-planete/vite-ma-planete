// Otel must be imported before any other modules
import { otelEnabled, otelSDK } from '@vite-ma-planete/opentelemetry';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import {
  ExceptionsFilter,
  PrismaClientExceptionFilter,
} from '@vite-ma-planete/error';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseFormatterInterceptor } from '@vite-ma-planete/utils';
import { Logger } from 'nestjs-pino';
import helmet from '@fastify/helmet';
import csrf from '@fastify/csrf-protection';

const isProd = process.env.NODE_ENV === 'production';

async function bootstrap() {
  if (otelEnabled) {
    await otelSDK.start();
  }

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    }
  );

  if (otelEnabled) {
    app.useLogger(app.get(Logger));
  }

  const httpAdapter = app.getHttpAdapter();

  app.enableCors();
  if (isProd) {
    // Security plugins
    await app.register(helmet);
    await app.register(csrf);
  }

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      skipNullProperties: false,
      skipUndefinedProperties: false,
    })
  );

  // Errors filters
  app.useGlobalFilters(
    new ExceptionsFilter(httpAdapter),
    new PrismaClientExceptionFilter(httpAdapter)
  );

  // Response formatter interceptor
  app.useGlobalInterceptors(new ResponseFormatterInterceptor());

  app.enableShutdownHooks();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('vite-ma-planete API')
    .setDescription('Your NX template to provide a Seamless Experience.')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 3100;
  await app.listen(port, '0.0.0.0');
}

bootstrap();
