import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@vite-ma-planete/auth';
import { DatabaseModule } from '@vite-ma-planete/database';
import { NotesModule } from '@vite-ma-planete/notes';
import { OpenTelemetryModule } from '@vite-ma-planete/opentelemetry';

@Module({
  imports: [
    OpenTelemetryModule.forRoot(),
    ConfigModule.forRoot(),
    AuthModule,
    DatabaseModule,
    NotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}