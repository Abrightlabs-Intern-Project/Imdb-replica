import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Actor } from './entities/actor.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from 'src/aws/aws.service';

@ApiTags('actor')
@Controller('actor')
export class ActorController {
  constructor(private actorService: ActorService, private awsService: AwsS3Service) {}

  @Get()
  @ApiOkResponse({ type: Actor, isArray: true })
  async findAll() {
    return this.actorService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file: Express.Multer.File, @Body("actorName") actorName: string)
  {
    let actor = await this.actorService.find(actorName);
    if (actor) {
      return actor.actorId;
    }
    else {
    const key = `actorImage/${Date.now()}_${file.originalname}`;
    await this.awsService.upload(file, key);
    const actorId = await this.actorService.create(actorName, key);
    return actorId
    }
  }

  // It is Good for efficient creation of array of actors

  /* @Post('batch')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOkResponse({ type: [String] })
  async createOrGetActorsBatch(@UploadedFile() file: Express.Multer.File, @Body() actorNames: string[]): Promise<string[]> {
    const actorIds: string[] = [];
    for (const actorName of actorNames) {
        let actor = await this.actorService.find(actorName);
        let actorId: string;
        if (actor) {
          actorId = actor.actorId;
        } else {
          const key = `actorImage/${Date.now()}_${file.originalname}`;
          await this.awsService.upload(file, key);
          actorId = await this.actorService.create(actorName, key);
        }
        actorIds.push(actorId);
    }
    return actorIds;
  } */

  @Get(":actorId")
  @ApiOkResponse()
  async find(@Param("actorId") actorId) {
    return this.actorService.find(actorId)
  }

  @Delete(':actorId')
  @ApiOkResponse()
  async delete(@Param('actorId') actorId: string): Promise<{ message: string }> {
    try {
      await this.actorService.delete(actorId);
      return { message: 'Actor successfully deleted' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Patch(":actorId")
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param("actorId") actorId: string, @UploadedFile() file: Express.Multer.File, @Body("actorName") actorName: string) {
    if(file) {
      const key = `actorImage/${Date.now()}_${file.originalname}`;
      await this.awsService.upload(file, key);
      return this.actorService.update(actorId, actorName, key);
    }
    return this.actorService.update(actorId, actorName);
  }
}