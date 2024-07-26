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
exports.ActorController = void 0;
const common_1 = require("@nestjs/common");
const actor_service_1 = require("./actor.service");
const swagger_1 = require("@nestjs/swagger");
const actor_entity_1 = require("./entities/actor.entity");
const platform_express_1 = require("@nestjs/platform-express");
const aws_service_1 = require("../aws/aws.service");
let ActorController = class ActorController {
    constructor(actorService, awsService) {
        this.actorService = actorService;
        this.awsService = awsService;
    }
    async findAll() {
        return this.actorService.findAll();
    }
    async create(file, actorName) {
        let actor = await this.actorService.findWithName(actorName);
        if (actor) {
            return actor.actorId;
        }
        else {
            const key = `actorImage/${Date.now()}_${file.originalname}`;
            await this.awsService.upload(file, key);
            const actorId = await this.actorService.create(actorName, key);
            return actorId;
        }
    }
    async find(actorId) {
        return this.actorService.find(actorId);
    }
    async delete(actorId) {
        try {
            await this.actorService.delete(actorId);
            return { message: 'Actor successfully deleted' };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async update(actorId, file, actorName) {
        if (file) {
            const key = `actorImage/${Date.now()}_${file.originalname}`;
            await this.awsService.upload(file, key);
            return this.actorService.update(actorId, actorName, key);
        }
        return this.actorService.update(actorId, actorName);
    }
    async getActor(actorId) {
        return this;
    }
};
exports.ActorController = ActorController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: actor_entity_1.Actor, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)("actorName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":actorId"),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Param)("actorId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "find", null);
__decorate([
    (0, common_1.Delete)(':actorId'),
    (0, swagger_1.ApiOkResponse)(),
    __param(0, (0, common_1.Param)('actorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(":actorId"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)("actorId")),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)("actorName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ActorController.prototype, "getActor", null);
exports.ActorController = ActorController = __decorate([
    (0, swagger_1.ApiTags)('actor'),
    (0, common_1.Controller)('actor'),
    __metadata("design:paramtypes", [actor_service_1.ActorService, aws_service_1.AwsS3Service])
], ActorController);
//# sourceMappingURL=actor.controller.js.map