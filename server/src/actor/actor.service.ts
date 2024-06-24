import { Injectable } from '@nestjs/common';
import { Actor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllActors() {
    return this.prisma.actor.findMany();
  }
}
