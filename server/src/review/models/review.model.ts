import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Review {
    @Field((type) => Int)
    id: number;

    @Field()
    userEmail: string;

    @Field()
    imdbID: string;

    @Field((type) => Int)
    rating: number

    @Field()
    title: string;

    @Field()
    description: string;
}