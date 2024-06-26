import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieController } from './movie.controller';

@Module({
  providers: [MovieService, PrismaService],
  controllers: [MovieController]
})
export class MovieModule {}
