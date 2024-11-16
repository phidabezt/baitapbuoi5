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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createOrderDto) {
        const { user_id, status, items } = createOrderDto;
        return this.prismaService.$transaction(async (prisma) => {
            const order = await prisma.orders.create({
                data: {
                    user_id: Number(user_id),
                    status: status || 'pending',
                },
            });
            const orderItems = items.map(async (item) => ({
                order_id: order.id,
                food_id: item.id,
                quantity: item.quantity,
                price: item.quantity * (await this.getFoodPrice(item.id, prisma)),
            }));
            await prisma.order_items.createMany({
                data: await Promise.all(orderItems)
            });
            return order;
        });
    }
    async getFoodPrice(foodId, prisma) {
        const food = await prisma.foods.findUnique({ where: { id: foodId } });
        if (!food)
            throw new Error(`Food with ID ${foodId} not found`);
        return food.price.toNumber();
    }
    async payOrder(orderId) {
        const orderItems = await this.prismaService.order_items.findMany({
            where: { order_id: orderId },
        });
        for (const item of orderItems) {
            await this.prismaService.foods.update({
                where: { id: item.food_id },
                data: { stock: { decrement: item.quantity } },
            });
        }
        return this.prismaService.orders.update({
            where: { id: orderId },
            data: { status: 'paid' },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map