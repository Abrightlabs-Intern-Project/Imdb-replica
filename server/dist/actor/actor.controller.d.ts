/// <reference types="multer" />
import { ActorService } from './actor.service';
import { AwsS3Service } from '../aws/aws.service';
export declare class ActorController {
    private actorService;
    private awsService;
    constructor(actorService: ActorService, awsService: AwsS3Service);
    findAll(): Promise<{
        actorId: string;
        actorName: string;
        imageUrl: string;
    }[]>;
    create(file: Express.Multer.File, actorName: string): Promise<string>;
    find(actorId: any): Promise<{
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
    delete(actorId: string): Promise<{
        message: string;
    }>;
    update(actorId: string, file: Express.Multer.File, actorName: string): Promise<{
        actorId: string;
        actorName: string;
        imageUrl: string;
    }>;
    getActor(actorId: string): Promise<this>;
}
