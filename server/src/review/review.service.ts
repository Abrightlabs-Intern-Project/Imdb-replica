import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async find(movieId: string) {
    return await this.prisma.review.findMany({
      where: {
        movieId
      },
      include: {
        user: true
      }
    })
  } 

  async findUserReviws(userId: string) {
    return await this.prisma.review.findMany({
      where: {
        userId
      },
      include: {
        movie: true
      }
    })
  } 

  async create(userId: string, movieId: string, rating: string, title: string, description: string) {
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

  async delete(reviewId) {
    return await this.prisma.review.delete({
      where: {
        reviewId
      }
    })
  }
}
