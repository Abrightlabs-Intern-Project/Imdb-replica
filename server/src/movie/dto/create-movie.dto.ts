import { ApiProperty } from "@nestjs/swagger";
import { Country, Director, Writer } from "@prisma/client";
import { Actor } from "src/actor/models/actor.model";
import { Genre } from "src/genre/models/genre.model";

export class CreateMovieDto {
    @ApiProperty()
    movieId: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    year: string;

    @ApiProperty()
    rated: string;

    @ApiProperty()
    released: string;

    @ApiProperty()
    runtime: string;

    @ApiProperty()
    plot: string;

    @ApiProperty()
    language: string;

    @ApiProperty()
    awards: string;

    @ApiProperty()
    poster: string;

    @ApiProperty()
    trailer: string;

    @ApiProperty()
    metascore: string;

    @ApiProperty()
    rating: string;

    @ApiProperty()
    votes: string;

    @ApiProperty()
    boxOffice: string

    @ApiProperty()
    actors: Actor[]

    @ApiProperty()
    directors: Director[]

    @ApiProperty()
    writers: Writer[]

    @ApiProperty()
    genres: Genre[]

    @ApiProperty()  
    countries: Country[]
}