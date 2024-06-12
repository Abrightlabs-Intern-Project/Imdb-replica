import { Module } from '@nestjs/common';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ReviewResolver, ReviewService, PrismaService]
})
export class ReviewModule {}
