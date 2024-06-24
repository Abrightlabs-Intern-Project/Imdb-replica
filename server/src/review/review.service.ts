import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async addReview(userId: string, movieId: string, rating: string, title: string, description: string) {
    return await this.prisma.review.create({
      data: {
        userId,
        movieId,
        rating,
        title,
        description
      }, 
    })
  }
}
