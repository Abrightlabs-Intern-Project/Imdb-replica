import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Actor } from './entities/actor.entity';
import { CreateActorDto } from './dto/create-actor.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('actor')
@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

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
    const actorId = await this.actorService.create(actorName, key);
    return actorId
  }

  @Get()
  @ApiOkResponse({ type: Actor, isArray: true })
  async findAll() {
    return this.actorService.findAll();
  }

  @Get(":actorId")
  async find(@Param("actorId") actorId) {
    return this.actorService.find(actorId)
  }

  @Delete(':actorId')
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
  async update(@Param("actorId") actorId: string, @Body("actorName") actorName: string) {
    return this.actorService.update(actorId, actorName);
  }
}