import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Actor } from './entities/actor.entity';
import { CreateActorDto } from './dto/create-actor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from 'src/aws/aws.service';

@ApiTags('actor')
@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService, private awsService: AwsS3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file: Express.Multer.File, @Body("actorName") actorName: string)
  {
    let actor = await this.actorService.find(actorName);
    if (actor) {
      return actor.actorId;
    }
    const key = `actorImage/${Date.now()}_${file.originalname}`;
    await this.actorService.upload(file, key);
    const actorId = await this.actorService.create(actorName, key)
    return actorId
  }

  @Get()
  @ApiOkResponse({ type: Actor, isArray: true })
  async findAll() {
    const actors = await this.actorService.findAll();
    for(let i=0; i<actors.length; i++) {
        const actorKey = actors[i].imageUrl; 
        const imageBuffer = await this.awsService.getImage(actorKey);
        actors[i].imageUrl = imageBuffer.toString('base64'); 
    }
    return actors
  }
}
