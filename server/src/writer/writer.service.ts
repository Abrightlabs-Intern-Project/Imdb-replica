import { Injectable } from '@nestjs/common';
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
}
