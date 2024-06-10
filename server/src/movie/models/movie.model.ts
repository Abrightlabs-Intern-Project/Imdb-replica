import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Movie {
  @Field(() => ID)
  id: number;

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
  genre: string;

  @Field()
  director: string;

  @Field()
  writer: string;

  @Field()
  actors: string;

  @Field()
  plot: string;

  @Field()
  language: string;

  @Field()
  country: string;

  @Field()
  awards: string;

  @Field()
  poster: string;

  @Field()
  ratings: string;

  @Field()
  metascore: string;

  @Field()
  imdbRating: string;

  @Field()
  imdbVotes: string;

  @Field()
  imdbID: string;

  @Field()
  type: string;

  @Field()
  dvd: string;

  @Field()
  boxOffice: string;

  @Field()
  production: string;

  @Field()
  website: string;

  @Field()
  response: string;
}
