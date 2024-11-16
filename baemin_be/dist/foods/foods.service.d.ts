import { PrismaService } from '../prisma/prisma.service';
export declare class FoodsService {
    private prisma;
    constructor(prisma: PrismaService);
    getFoods(page: number, limit: number, categories?: string | string[]): Promise<{
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
    getCategories(): Promise<{
        id: string;
        name: string;
    }[]>;
    searchFood({ keyword, category_id, }: {
        keyword: string;
        category_id?: string;
    }): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        stock: number | null;
        category_id: string | null;
    }[]>;
}
