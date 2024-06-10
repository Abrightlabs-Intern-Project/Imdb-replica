import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MovieService, MovieResolver, PrismaService]
})
export class MovieModule {}
