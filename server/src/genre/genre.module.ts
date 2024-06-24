import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreResolver } from './genre.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenreController } from './genre.controller';

@Module({
  providers: [GenreService, GenreResolver, PrismaService],
  controllers: [GenreController]
})
export class GenreModule {}
