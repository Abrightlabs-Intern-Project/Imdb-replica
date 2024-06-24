import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Movie } from 'src/movie/models/movie.model';

@ObjectType()
export class Watchlist {
  @Field(() => ID)
  id: number;

  @Field(() => Movie)
  movie: Movie;
}
