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
exports.WatchlistController = void 0;
const common_1 = require("@nestjs/common");
const watchlist_service_1 = require("./watchlist.service");
const swagger_1 = require("@nestjs/swagger");
const create_watchlist_dto_1 = require("./dto/create-watchlist.dto");
const watchlist_entity_1 = require("./entities/watchlist.entity");
let WatchlistController = class WatchlistController {
    constructor(watchlistService) {
        this.watchlistService = watchlistService;
    }
    async create(data) {
        return this.watchlistService.create(data.movieId, data.userId);
    }
    async delete(userId, movieId) {
        return this.watchlistService.delete(movieId, userId);
    }
    async find(userId) {
        return this.watchlistService.find(userId);
    }
};
exports.WatchlistController = WatchlistController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCreatedResponse)({ type: watchlist_entity_1.Watchlist }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_watchlist_dto_1.CreateWatchlistDto]),
    __metadata("design:returntype", Promise)
], WatchlistController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':userId/:movieId'),
    (0, swagger_1.ApiOkResponse)({ type: watchlist_entity_1.Watchlist }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Param)('movieId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WatchlistController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ type: watchlist_entity_1.Watchlist, isArray: true }),
    __param(0, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WatchlistController.prototype, "find", null);
exports.WatchlistController = WatchlistController = __decorate([
    (0, swagger_1.ApiTags)('watchlist'),
    (0, common_1.Controller)('watchlist'),
    __metadata("design:paramtypes", [watchlist_service_1.WatchlistService])
], WatchlistController);
//# sourceMappingURL=watchlist.controller.js.map