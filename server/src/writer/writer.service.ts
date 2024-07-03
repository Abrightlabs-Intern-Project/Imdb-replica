import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWriterDto } from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';
import { Writer } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WriterService {

  constructor (private readonly prisma: PrismaService) {}

  async createOrGet(writerDto: CreateWriterDto) {
    const { writerName } = writerDto;

    let writer = await this.prisma.writer.findUnique({ where: { writerName } });

    if (!writer) {
      writer = await this.prisma.writer.create({
        data: {
          writerName
        },
      });
    }
    return writer.writerId;
  }

  async create(createWriterDto: CreateWriterDto) {
    return await this.prisma.writer.create({
      data: createWriterDto
    })
  }

  async findAll() {
    return await this.prisma.writer.findMany()
  }

  async delete(writerId: string) {
    const writer = await this.prisma.writer.findUnique({
      where: { writerId },
      include: { movies: true },
    });
    if (writer.movies.length > 0) {
      throw new BadRequestException(`Writer with ID ${writerId} is associated with movies and cannot be deleted`);
    }
    await this.prisma.writer.delete({
      where: { writerId },
    });
  }
}
