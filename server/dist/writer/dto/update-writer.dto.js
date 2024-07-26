"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWriterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_writer_dto_1 = require("./create-writer.dto");
class UpdateWriterDto extends (0, swagger_1.PartialType)(create_writer_dto_1.CreateWriterDto) {
}
exports.UpdateWriterDto = UpdateWriterDto;
//# sourceMappingURL=update-writer.dto.js.map