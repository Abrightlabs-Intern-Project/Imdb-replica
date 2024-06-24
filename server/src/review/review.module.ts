import { Module } from '@nestjs/common';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReviewController } from './review.controller';

@Module({
  providers: [ReviewResolver, ReviewService, PrismaService],
  controllers: [ReviewController]
})
export class ReviewModule {}
