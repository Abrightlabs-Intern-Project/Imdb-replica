import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Watchlist } from 'src/watchlist/models/watchlist.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field(() => [Watchlist], { nullable: true })
  watchlist?: Watchlist[];
}
