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
exports.DirectorController = void 0;
const common_1 = require("@nestjs/common");
const director_service_1 = require("./director.service");
const create_director_dto_1 = require("./dto/create-director.dto");
const swagger_1 = require("@nestjs/swagger");
let DirectorController = class DirectorController {
    constructor(directorService) {
        this.directorService = directorService;
    }
    create(createDirectorDto) {
        return this.directorService.createOrGet(createDirectorDto);
    }
    findAll() {
        return this.directorService.findAll();
    }
    async delete(directorId) {
        try {
            await this.directorService.delete(directorId);
            return { message: 'Director successfully deleted' };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async update(directorId, directorName) {
        return this.directorService.update(directorId, directorName);
    }
};
exports.DirectorController = DirectorController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_director_dto_1.CreateDirectorDto]),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DirectorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(":directorId"),
    __param(0, (0, common_1.Param)("directorId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DirectorController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(":directorId"),
    __param(0, (0, common_1.Param)("directorId")),
    __param(1, (0, common_1.Body)("directorName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DirectorController.prototype, "update", null);
exports.DirectorController = DirectorController = __decorate([
    (0, swagger_1.ApiTags)('director'),
    (0, common_1.Controller)('director'),
    __metadata("design:paramtypes", [director_service_1.DirectorService])
], DirectorController);
//# sourceMappingURL=director.controller.js.map