import { ApiProperty } from "@nestjs/swagger";

export class CreateWatchlistDto {

  @ApiProperty()
  movieId: string;

  @ApiProperty()
  userId: string;
}
