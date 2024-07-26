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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const movie_entity_1 = require("./entities/movie.entity");
const swagger_1 = require("@nestjs/swagger");
const create_movie_dto_1 = require("./dto/create-movie.dto");
const platform_express_1 = require("@nestjs/platform-express");
const aws_service_1 = require("../aws/aws.service");
const update_movie_dto_1 = require("./dto/update-movie.dto");
let MovieController = class MovieController {
    constructor(movieService, awsService) {
        this.movieService = movieService;
        this.awsService = awsService;
    }
    async upload(file) {
        const key = `poster/${Date.now()}_${file.originalname}`;
        await this.awsService.upload(file, key);
        return { posterKey: key };
    }
    async search(title, rated, selectedGenre, minRating, maxRating, releaseYearFrom, releaseYearTo) {
        console.log(1);
        return this.movieService.search(title, rated, selectedGenre, minRating, maxRating, releaseYearFrom, releaseYearTo);
    }
    async findAll() {
        return this.movieService.findAll();
    }
    async create(createMovieDto) {
        return this.movieService.create(createMovieDto);
    }
    async find(movieId) {
        return this.movieService.find(movieId);
    }
    async update(movieId, updateMovieDto) {
        return this.movieService.update(movieId, updateMovieDto);
    }
    async delete(movieId) {
        return this.movieService.delete(movieId);
    }
};
exports.MovieController = MovieController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('poster')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('rated')),
    __param(2, (0, common_1.Query)('selectedGenre')),
    __param(3, (0, common_1.Query)('minRating')),
    __param(4, (0, common_1.Query)('maxRating')),
    __param(5, (0, common_1.Query)('releaseYearFrom')),
    __param(6, (0, common_1.Query)('releaseYearTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: [movie_entity_1.Movie] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_movie_dto_1.CreateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':movieId'),
    __param(0, (0, common_1.Param)('movieId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "find", null);
__decorate([
    (0, common_1.Put)(':movieId'),
    __param(0, (0, common_1.Param)('movieId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_movie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':movieId'),
    __param(0, (0, common_1.Param)('movieId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "delete", null);
exports.MovieController = MovieController = __decorate([
    (0, swagger_1.ApiTags)('movies'),
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movie_service_1.MovieService, aws_service_1.AwsS3Service])
], MovieController);
//# sourceMappingURL=movie.controller.js.map