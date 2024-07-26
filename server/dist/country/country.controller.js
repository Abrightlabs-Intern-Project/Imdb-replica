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
exports.CountryController = void 0;
const common_1 = require("@nestjs/common");
const country_service_1 = require("./country.service");
const create_country_dto_1 = require("./dto/create-country.dto");
const swagger_1 = require("@nestjs/swagger");
let CountryController = class CountryController {
    constructor(countryService) {
        this.countryService = countryService;
    }
    create(createCountryDto) {
        return this.countryService.createOrGet(createCountryDto);
    }
    findAll() {
        return this.countryService.findAll();
    }
    async delete(countryId) {
        try {
            await this.countryService.delete(countryId);
            return { message: 'Country successfully deleted' };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.HttpException({ message: error.message }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async update(countryId, countryName) {
        return this.countryService.update(countryId, countryName);
    }
};
exports.CountryController = CountryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_country_dto_1.CreateCountryDto]),
    __metadata("design:returntype", void 0)
], CountryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CountryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(":countryId"),
    __param(0, (0, common_1.Param)("countryId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(":countryId"),
    __param(0, (0, common_1.Param)("countryId")),
    __param(1, (0, common_1.Body)("countryName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CountryController.prototype, "update", null);
exports.CountryController = CountryController = __decorate([
    (0, swagger_1.ApiTags)('country'),
    (0, common_1.Controller)('country'),
    __metadata("design:paramtypes", [country_service_1.CountryService])
], CountryController);
//# sourceMappingURL=country.controller.js.map