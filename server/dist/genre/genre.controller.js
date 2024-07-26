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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreController = void 0;
const common_1 = require("@nestjs/common");
const genre_service_1 = require("./genre.service");
const swagger_1 = require("@nestjs/swagger");
const genre_entity_1 = require("./entities/genre.entity");
const create_genre_dto_1 = require("./dto/create-genre.dto");
const aws_service_1 = require("../aws/aws.service");
let GenreController = class GenreController {
    constructor(genreService, awsService) {
        this.genreService = genreService;
        this.awsService = awsService;
    }
    async create(createGenreDto) {
        return this.genreService.createOrGet(createGenreDto);
    }
    async findAll() {
        return this.genreService.findAll();
    }
    async find(genreId) {
        return this.genreService.find(genreId);
    }
    async delete(genreId) {
        try {
            await this.genreService.delete(genreId);
            return { message: 'Genre successfully deleted' };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async update(genreId, genreName) {
        return this.genreService.update(genreId, genreName);
    }
};
exports.GenreController = GenreController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_genre_dto_1.CreateGenreDto]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: genre_entity_1.Genre, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':genreId'),
    (0, swagger_1.ApiOkResponse)({ type: genre_entity_1.Genre }),
    __param(0, (0, common_1.Param)('genreId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "find", null);
__decorate([
    (0, common_1.Delete)(":genreId"),
    __param(0, (0, common_1.Param)("genreId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(":genreId"),
    __param(0, (0, common_1.Param)("genreId")),
    __param(1, (0, common_1.Body)("genreName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "update", null);
exports.GenreController = GenreController = __decorate([
    (0, swagger_1.ApiTags)('genre'),
    (0, common_1.Controller)('genre'),
    __metadata("design:paramtypes", [genre_service_1.GenreService, aws_service_1.AwsS3Service])
], GenreController);
//# sourceMappingURL=genre.controller.js.map