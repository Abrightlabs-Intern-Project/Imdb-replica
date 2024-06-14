import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';

@Module({
  providers: [CountryService, CountryResolver]
})
export class CountryModule {}
