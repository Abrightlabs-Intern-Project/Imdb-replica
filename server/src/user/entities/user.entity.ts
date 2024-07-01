import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ required: false, default: false })
  favouriteGenreId?: string;
}
