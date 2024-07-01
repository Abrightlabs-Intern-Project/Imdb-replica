import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl } from "class-validator";

export class Actor {
  @ApiProperty()
  @IsString()
  actorId: string;

  @ApiProperty()
  @IsString()
  actorName: string;

  @ApiProperty()
  @IsUrl()
  imageUrl: string;
}