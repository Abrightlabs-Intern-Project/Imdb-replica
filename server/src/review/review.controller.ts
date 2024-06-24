import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
    constructor (private readonly reviewService: ReviewService) {}

    @Post("add")
    async addReview(@Body() data: {userId, movieId, rating, title, description}) {
        return this.reviewService.addReview(data.userId, data.movieId, data.rating, data.title, data.description);
    }
}
