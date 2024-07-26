import { PrismaService } from '../prisma/prisma.service';
import { AwsS3Service } from '../aws/aws.service';
export declare class ActorService {
    private readonly prisma;
    private awsService;
    constructor(prisma: PrismaService, awsService: AwsS3Service);
    create(actorName: string, actorkey: string): Promise<string>;
    findAll(): Promise<{
        actorId: string;
        actorName: string;
        imageUrl: string;
    }[]>;
    find(actorId: string): Promise<{
        movies: {
            movieId: string;
            title: string;
            year: string;
            rated: string;
            released: string;
            runtime: string;
            plot: string;
            language: string;
            awards: string;
            poster: string;
            trailer: string;
            metascore: string;
            rating: string;
            votes: string;
            boxOffice: string;
        }[];
    } & {
        actorId: string;
        actorName: string;
        imageUrl: string;
    }>;
    findWithName(actorName: string): Promise<{
        movies: {
            movieId: string;
            title: string;
            year: string;
            rated: string;
            released: string;
            runtime: string;
            plot: string;
            language: string;
            awards: string;
            poster: string;
            trailer: string;
            metascore: string;
            rating: string;
            votes: string;
            boxOffice: string;
        }[];
    } & {
        actorId: string;
        actorName: string;
        imageUrl: string;
    }>;
    delete(actorId: string): Promise<void>;
    update(actorId: string, actorName: string, key?: string): Promise<{
        actorId: string;
        actorName: string;
        imageUrl: string;
    }>;
}
