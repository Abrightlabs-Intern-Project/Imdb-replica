import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieController } from './movie.controller';

@Module({
  providers: [MovieService, MovieResolver, PrismaService],
  controllers: [MovieController]
})
export class MovieModule {}
