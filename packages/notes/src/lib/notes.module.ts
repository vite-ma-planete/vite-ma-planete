import { Module } from '@nestjs/common';
import { AuthModule } from '@vite-ma-planete/auth';
import { DatabaseModule } from '@vite-ma-planete/database';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [],
})
export class NotesModule {}
