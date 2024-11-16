import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FoodsService {
  constructor(private prisma: PrismaService) {}

  async getFoods(page: number, limit: number, categories?: string | string[]) {
    const where: any = {};

    if (categories && categories.length > 0) {
      where.category_id = { in: categories };
    }

    return this.prisma.foods.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where,
    });
  }

  async getFood(id: string) {
    return this.prisma.foods.findUnique({ where: { id } });
  }

  async getCategories() {
    return this.prisma.categories.findMany();
  }

  async searchFood({
    keyword,
    category_id,
  } : {
    keyword: string;
    category_id?: string;
  }) {
    return await this.prisma.foods.findMany({
      where: {
        AND: [
          {
            name: {
              contains: keyword,
              mode: 'insensitive', // makes search case-insensitive
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
}
