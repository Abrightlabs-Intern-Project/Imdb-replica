import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { PrismaService } from '../prisma/prisma.service';

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

  async findAll() {
    return await this.prisma.director.findMany()
  }

  async delete(directorId: string) {
    const director = await this.prisma.director.findUnique({
      where: { directorId },
      include: { movies: true },
    });
    if (director.movies.length > 0) {
      throw new BadRequestException(`Director ${director.directorName} is associated with movies and cannot be deleted`);
    }
    await this.prisma.director.delete({
      where: { directorId },
    });
  }

  async update(directorId: string, directorName: string) {
    return await this.prisma.director.update({
      where: {
        directorId
      },
      data: {
        directorName
      }
    })
  }
}
