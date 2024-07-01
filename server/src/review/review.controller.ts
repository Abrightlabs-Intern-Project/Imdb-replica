import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor (private readonly reviewService: ReviewService) {}

    @Get(":movieId")
    async find(@Param("movieId") movieId: string) {
        return this.reviewService.find(movieId);
    }

    @Post()
    async create(@Body() data: {userId, movieId, rating, title, description}) {
        return this.reviewService.create(data.userId, data.movieId, data.rating, data.title, data.description);
    }

    @Delete(":userId/:movieId")
    async delete(@Param("userId") userId: string, @Param("movieId") movieId: string) {
        return this.reviewService.delete(userId, movieId)
    }
}
