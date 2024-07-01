import { Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { v4 as uuidv4 } from 'uuid';
import { Director } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DirectorService {

  constructor (private readonly prisma: PrismaService) {}

  async createOrGet(directorDto: CreateDirectorDto) {
    const { directorName } = directorDto;

    let director = await this.prisma.director.findUnique({ where: { directorName } });

    if (!director) {
      director = await this.prisma.director.create({
        data: {
          directorName
        }
      });
    }
    return director.directorId;
  }
}
