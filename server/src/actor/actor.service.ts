import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { AwsS3Service } from 'src/aws/aws.service';

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService,private awsService: AwsS3Service) {}

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
      },
      include: {
        movies: true
      }
    })
  }

  async delete(actorId: string) {
    const actor = await this.prisma.actor.findUnique({
      where: { actorId },
      include: { movies: true },
    });
    if (actor.movies.length > 0) {
      throw new BadRequestException(`Actor ${actor.actorName} is associated with movies and cannot be deleted`);
    }
    await this.prisma.actor.delete({
      where: { actorId },
    });
  }

  async update(actorId: string, actorName: string, key?: string) {
    return await this.prisma.actor.update({
      where: {
        actorId
      },
      data: {
        actorName,
        imageUrl: key
      }
    })
  }
}
