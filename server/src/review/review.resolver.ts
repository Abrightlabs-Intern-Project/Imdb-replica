import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { ReviewService } from './review.service';
import { Review } from './models/review.model';

@Resolver()
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Query(() => [Review])
  async getReviews(@Args('imdbID') imdbID: string): Promise<Review[]> {
    return this.reviewService.getReviews(imdbID);
  }

  @Mutation(() => Review)
  async addReview(
    @Args('userEmail') userEmail: string,
    @Args('imdbID') imdbID: string,
    @Args('rating') rating: string,
    @Args('title') title: string,
    @Args('description') description: string,
  ): Promise<Review> {
    return this.reviewService.addReview(
      userEmail,
      imdbID,
      rating,
      title,
      description,
    );
  }

  @Mutation(() => Boolean)
  async deleteReview(
    @Args('userEmail') userEmail: string,
    @Args('imdbID') imdbID: string,
  ): Promise<boolean> {
    return this.reviewService.deleteReview(userEmail, imdbID);
  }
}
