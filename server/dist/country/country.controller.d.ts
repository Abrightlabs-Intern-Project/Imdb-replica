import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    create(createCountryDto: CreateCountryDto): Promise<string>;
    findAll(): Promise<{
        countryId: string;
        countryName: string;
    }[]>;
    delete(countryId: string): Promise<{
        message: string;
    }>;
    update(countryId: string, countryName: string): Promise<{
        countryId: string;
        countryName: string;
    }>;
}
