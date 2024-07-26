import { CreateDirectorDto } from './dto/create-director.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class DirectorService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOrGet(directorDto: CreateDirectorDto): Promise<string>;
    findAll(): Promise<{
        directorId: string;
        directorName: string;
    }[]>;
    delete(directorId: string): Promise<void>;
    update(directorId: string, directorName: string): Promise<{
        directorId: string;
        directorName: string;
    }>;
}
