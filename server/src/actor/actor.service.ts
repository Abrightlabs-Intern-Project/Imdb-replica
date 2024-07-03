import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Actor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateActorDto } from './dto/create-actor.dto';
import { AwsS3Service } from 'src/aws/aws.service';

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService,private awsService: AwsS3Service) {}

  async upload(file, key: string) {
    return this.awsService.upload(file, key)
  }

  async create(actorName: string, actorkey: string) {
    const actor = await this.prisma.actor.create({
      data: {
        actorName,
        imageUrl: actorkey,
      },
    });
    return actor.actorId;
  }

  async findAll() {
    return this.prisma.actor.findMany();
  }

  async find(actorName: string) {
    return this.prisma.actor.findUnique({
      where: {
        actorName
      }
    })
  }

  async delete(actorId: string) {
    const actor = await this.prisma.actor.findUnique({
      where: { actorId },
      include: { movies: true },
    });
    if (actor.movies.length > 0) {
      throw new BadRequestException(`Actor with ID ${actorId} is associated with movies and cannot be deleted`);
    }
    await this.prisma.actor.delete({
      where: { actorId },
    });
  }
}
