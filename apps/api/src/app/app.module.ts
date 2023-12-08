import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@vite-ma-planete/auth';
import { DatabaseModule } from '@vite-ma-planete/database';
import { OpenTelemetryModule } from '@vite-ma-planete/opentelemetry';

@Module({
  imports: [
    OpenTelemetryModule.forRoot(),
    ConfigModule.forRoot(),
    AuthModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
