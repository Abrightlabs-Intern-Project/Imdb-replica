import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async getReviews(imdbID: string): Promise<Review[]> {
    return await this.prisma.review.findMany({
      where: {
        imdbID,
      },
    });
  }

  async addReview(
    userEmail: string,
    imdbID: string,
    rating: number,
    title: string,
    description: string,
  ) {
    const review = await this.prisma.review.findFirst({
      where: {
        userEmail,
        imdbID,
      },
    });
    if (review) return review;
    return await this.prisma.review.create({
      data: {
        userEmail,
        imdbID,
        rating,
        title,
        description,
      },
    });
  }
}
