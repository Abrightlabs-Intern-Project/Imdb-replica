import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userName: string, userId: string) {
    return await this.prisma.user.create({
      data: {
        userName,
        userId,
      },
    });
  }

  async find(userId: string) {
    return await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });
  }
}
