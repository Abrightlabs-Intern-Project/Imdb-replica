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
exports.WriterController = void 0;
const common_1 = require("@nestjs/common");
const writer_service_1 = require("./writer.service");
const create_writer_dto_1 = require("./dto/create-writer.dto");
const swagger_1 = require("@nestjs/swagger");
let WriterController = class WriterController {
    constructor(writerService) {
        this.writerService = writerService;
    }
    create(createWriterDto) {
        return this.writerService.createOrGet(createWriterDto);
    }
    findAll() {
        return this.writerService.findAll();
    }
    async delete(writerId) {
        try {
            await this.writerService.delete(writerId);
            return { message: 'Writer successfully deleted' };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async update(writerId, writerName) {
        return this.writerService.update(writerId, writerName);
    }
};
exports.WriterController = WriterController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_writer_dto_1.CreateWriterDto]),
    __metadata("design:returntype", void 0)
], WriterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WriterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(":writerId"),
    __param(0, (0, common_1.Param)("writerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(":writerId"),
    __param(0, (0, common_1.Param)("writerId")),
    __param(1, (0, common_1.Body)("writerName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], WriterController.prototype, "update", null);
exports.WriterController = WriterController = __decorate([
    (0, swagger_1.ApiTags)('writer'),
    (0, common_1.Controller)('writer'),
    __metadata("design:paramtypes", [writer_service_1.WriterService])
], WriterController);
//# sourceMappingURL=writer.controller.js.map