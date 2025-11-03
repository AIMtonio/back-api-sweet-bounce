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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let EventsService = class EventsService {
    constructor(_prismaService) {
        this._prismaService = _prismaService;
    }
    async create(createEventDto) {
        try {
            const eventCrete = await this._prismaService.evento.create({ data: createEventDto });
            if (!eventCrete) {
                throw new common_2.ConflictException('Error al crear el evento');
            }
            return eventCrete;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_2.ConflictException(`Product with SKU ${createEventDto.name} already exists`);
                }
            }
        }
    }
    findAll() {
        return this._prismaService.evento.findMany();
    }
    async findOne(id) {
        const eventFound = await this._prismaService.evento.findUnique({ where: { id } });
        if (!eventFound) {
            throw new common_2.ConflictException(`El evento con id ${id} no existe`);
        }
        return eventFound;
    }
    async update(id, updateEventDto) {
        const eventFound = await this._prismaService.evento.findUnique({ where: { id } });
        if (!eventFound) {
            throw new common_2.ConflictException(`El evento con id ${id} no existe`);
        }
        const eventUpdate = await this._prismaService.evento.update({ where: { id }, data: updateEventDto });
        return eventUpdate;
    }
    async remove(id) {
        const eventFound = await this._prismaService.evento.findUnique({ where: { id } });
        if (!eventFound) {
            throw new common_2.ConflictException(`El evento con id ${id} no existe`);
        }
        return this._prismaService.evento.delete({ where: { id } });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
//# sourceMappingURL=events.service.js.map