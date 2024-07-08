import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpStatus, HttpException, Put } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.createOrGet(createCountryDto);
  }

  @Get()
  findAll() {
    return this.countryService.findAll()
  }

  @Delete(":countryId")
  async delete(@Param("countryId") countryId: string) {
    try {
      await this.countryService.delete(countryId);
      return { message: 'Country successfully deleted' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST);
      }
    }
  }

  @Patch(":countryId")
  async update(@Param("countryId") countryId: string, @Body("countryName") countryName: string) {
    return this.countryService.update(countryId, countryName)
  }
}
