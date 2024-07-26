import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
export declare class DirectorController {
    private readonly directorService;
    constructor(directorService: DirectorService);
    create(createDirectorDto: CreateDirectorDto): Promise<string>;
    findAll(): Promise<{
        directorId: string;
        directorName: string;
    }[]>;
    delete(directorId: string): Promise<{
        message: string;
    }>;
    update(directorId: string, directorName: string): Promise<{
        directorId: string;
        directorName: string;
    }>;
}
