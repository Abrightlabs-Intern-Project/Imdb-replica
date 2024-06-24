import { Controller, Get, Param } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
    constructor (private readonly genreService: GenreService) {}

    @Get()
    async getAllGenres() {
        return this.genreService.getAllGenres();
    }

    @Get(":genreId") 
    async getMovie(@Param("genreId") genreId: string) {
        return this.genreService.getMovie(genreId);
    }
}
