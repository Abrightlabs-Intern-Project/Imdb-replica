import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async delete(userId: string, movieId: string) {
    return await this.prisma.review.delete({
      where: {
        userId_movieId: {
          movieId,
          userId
        }
      }
    })
  }
}
