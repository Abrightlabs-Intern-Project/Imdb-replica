"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GenreService = class GenreService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrGet(genreDto) {
        const { genreName } = genreDto;
        let genre = await this.prisma.genre.findUnique({ where: { genreName } });
        if (!genre) {
            genre = await this.prisma.genre.create({
                data: {
                    genreName
                },
            });
        }
        return genre.genreId;
    }
    async findAll() {
        return await this.prisma.genre.findMany();
    }
    async find(genreId) {
        return await this.prisma.genre.findUnique({
            where: {
                genreId,
            },
            include: {
                movies: true,
            },
        });
    }
    async delete(genreId) {
        const genre = await this.prisma.genre.findUnique({
            where: { genreId },
            include: { movies: true },
        });
        if (genre.movies.length > 0) {
            throw new common_1.BadRequestException(`${genre.genreName} genre is associated with movies and cannot be deleted`);
        }
        await this.prisma.genre.delete({
            where: { genreId },
        });
    }
    async update(genreId, genreName) {
        return await this.prisma.genre.update({
            where: {
                genreId
            },
            data: {
                genreName
            }
        });
    }
};
exports.GenreService = GenreService;
exports.GenreService = GenreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GenreService);
//# sourceMappingURL=genre.service.js.map