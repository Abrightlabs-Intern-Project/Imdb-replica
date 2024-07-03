import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CountryService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrGet(countryDto: CreateCountryDto) {
    const { countryName } = countryDto;

    let country = await this.prisma.country.findUnique({
      where: { countryName },
    });

    if (!country) {
      country = await this.prisma.country.create({
        data: {
          countryName
        },
      });
    }
    return country.countryId;
  }

  async findAll() {
    return await this.prisma.country.findMany();
  }

  async findOne(countryName: string) {
    return await this.prisma.country.findUnique({
      where: {
        countryName,
      },
    });
  }

  async delete(countryId: string) {
    const country = await this.prisma.country.findUnique({
      where: { countryId },
      include: { movies: true },
    });
    if (country.movies.length > 0) {
      throw new BadRequestException(`Country with ID ${countryId} is associated with movies and cannot be deleted`);
    }
    await this.prisma.country.delete({
      where: { countryId },
    });
  }
}
