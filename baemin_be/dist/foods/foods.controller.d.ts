import { FoodsService } from './foods.service';
export declare class FoodsController {
    private readonly foodsService;
    constructor(foodsService: FoodsService);
    getFoods(page?: string, limit?: string, categories?: string | string[]): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number | null;
        category_id: string | null;
    }[]>;
    getCategories(): Promise<{
        id: string;
        name: string;
    }[]>;
    searchFood(keyword: string, category_id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number | null;
        category_id: string | null;
    }[]>;
    getFood(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number | null;
        category_id: string | null;
    }>;
}
