import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenreService {
    constructor (private readonly prisma: PrismaService) {}

    async getAllGenres() {
        return await this.prisma.genre.findMany();
    }

    async getMovie(genreId: string) {
        return await this.prisma.movieGenre.findMany({
            where: {
                genreId
            },
            include: {
                movie: true
            }
        })
    }
}
