import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Review {
  @Field((type) => Int)
  id: number;

  @Field()
  userEmail: string;

  @Field()
  imdbID: string;

  @Field()
  rating: string;

  @Field()
  title: string;

  @Field()
  description: string;
}
