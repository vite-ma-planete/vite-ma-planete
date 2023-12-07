import { UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiRoute, ApiRouteOptions } from './api-route.decorator';
import { JwtAuthGuard } from '@vite-ma-planete/auth';

export const ApiRouteAuthenticated = (options: ApiRouteOptions) =>
  applyDecorators(
    ApiCookieAuth(),
    UseGuards(JwtAuthGuard),
    ApiForbiddenResponse({
      description: 'Forbidden access to the requested resource',
    }),
    ApiUnauthorizedResponse({
      description: 'Authorization properties are missing from the request',
    }),
    ApiRoute(options)
  );
