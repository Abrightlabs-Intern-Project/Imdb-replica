import { CreateCountryDto } from './dto/create-country.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CountryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrGet(countryDto: CreateCountryDto): Promise<string>;
    findAll(): Promise<{
        countryId: string;
        countryName: string;
    }[]>;
    findOne(countryName: string): Promise<{
        countryId: string;
        countryName: string;
    }>;
    delete(countryId: string): Promise<void>;
    update(countryId: any, countryName: any): Promise<{
        countryId: string;
        countryName: string;
    }>;
}
