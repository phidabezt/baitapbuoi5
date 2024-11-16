import { Controller, Get, Param, Query } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { UUID } from 'crypto';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) { }

  @Get()
  async getFoods(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('categories') categories?: string | string[],
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const categoryIds = Array.isArray(categories) ? categories : categories ? [categories] : undefined;

    return this.foodsService.getFoods(pageNumber, limitNumber, categoryIds);
  }

  @Get('categories')
  async getCategories() {
    return this.foodsService.getCategories();
  }

  @Get('search')
  async searchFood(
    @Query('keyword') keyword: string,
    @Query('category') category_id: string
  ) {
    return this.foodsService.searchFood({keyword, category_id});
  }

  @Get(':id')
  async getFood(@Param('id') id: string) {
    return this.foodsService.getFood(id);
  }
}
