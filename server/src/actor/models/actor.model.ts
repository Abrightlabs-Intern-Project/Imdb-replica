import { ApiProperty } from "@nestjs/swagger";

export class Actor {
  @ApiProperty()
  actorId: string;

  @ApiProperty()
  actorName: string;

  @ApiProperty()
  imageUrl: string;
}