import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './models/review.model';

@Resolver()
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}
}
