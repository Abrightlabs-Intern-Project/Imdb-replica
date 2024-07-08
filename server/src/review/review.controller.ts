import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor (private readonly reviewService: ReviewService) {}

    @Get(":movieId")
    async find(@Param("movieId") movieId: string) {
        return this.reviewService.find(movieId);
    }

    @Get("user/:userId")
    async findUserReviews(@Param("userId") userId: string) {
        return this.reviewService.findUserReviws(userId);
    }

    @Post()
    async create(@Body() data: {userId, movieId, rating, title, description}) {
        return this.reviewService.create(data.userId, data.movieId, data.rating, data.title, data.description);
    }

    @Delete(":reviewId")
    async delete(@Param("reviewId") reviewId: string) {
        return this.reviewService.delete(reviewId)
    }
}
