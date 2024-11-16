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
exports.FoodsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FoodsService = class FoodsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFoods(page, limit, categories) {
        const where = {};
        if (categories && categories.length > 0) {
            where.category_id = { in: categories };
        }
        return this.prisma.foods.findMany({
            take: limit,
            skip: (page - 1) * limit,
            where,
        });
    }
    async getFood(id) {
        return this.prisma.foods.findUnique({ where: { id } });
    }
    async getCategories() {
        return this.prisma.categories.findMany();
    }
    async searchFood({ keyword, category_id, }) {
        return await this.prisma.foods.findMany({
            where: {
                AND: [
                    {
                        name: {
                            contains: keyword,
                            mode: 'insensitive',
                        },
                    },
                    {
                        category_id: {
                            equals: category_id,
                        },
                    },
                ],
            },
        });
    }
};
exports.FoodsService = FoodsService;
exports.FoodsService = FoodsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FoodsService);
//# sourceMappingURL=foods.service.js.map