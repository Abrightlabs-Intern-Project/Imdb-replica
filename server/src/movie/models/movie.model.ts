import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field(() => ID)
  movieId: string;

  @Field()
  title: string;

  @Field()
  year: string;

  @Field()
  rated: string;

  @Field()
  released: string;

  @Field()
  runtime: string;

  @Field()
  plot: string;

  @Field()
  language: string;

  @Field()
  awards: string;

  @Field()
  poster: string;

  @Field()
  trailer: string;

  @Field()
  metascore: string;

  @Field()
  rating: string;

  @Field()
  votes: string;

  @Field()
  boxOffice: string;
}
