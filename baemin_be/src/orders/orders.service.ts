import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FoodsService } from '../foods/foods.service';

@Injectable()
export class OrdersService {

  constructor(private prismaService: PrismaService
  ) { }

  create(createOrderDto: CreateOrderDto) {
    const { user_id, status, items } = createOrderDto;

    // Start transaction to ensure atomicity
    return this.prismaService.$transaction(async (prisma) => {
      // Create order
      const order = await prisma.orders.create({
        data: {
          user_id: Number(user_id),
          status: status || 'pending',
        },
      });

      // Add items to the order
      const orderItems = items.map(async (item) => ({
        order_id: order.id,
        food_id: item.id,
        quantity: item.quantity,
        price: item.quantity * (await this.getFoodPrice(item.id, prisma)),
      }));

      await prisma.order_items.createMany({
        data: await Promise.all(
          orderItems
        )
      });

      return order;
    });
  }

  private async getFoodPrice(foodId: string, prisma: any): Promise<number> {
    const food = await prisma.foods.findUnique({ where: { id: foodId } });
    if (!food) throw new Error(`Food with ID ${foodId} not found`);
    return food.price.toNumber();
  }

  async payOrder(orderId: string) {
    // update foods quantity
    const orderItems = await this.prismaService.order_items.findMany({
      where: { order_id: orderId },
    });

    for (const item of orderItems) {
      await this.prismaService.foods.update({
        where: { id: item.food_id },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // update order status
    return this.prismaService.orders.update({
      where: { id: orderId },
      data: { status: 'paid' },
    });
  }
}
