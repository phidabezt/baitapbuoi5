import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class OrdersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<{
        id: string;
        user_id: number;
        status: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    private getFoodPrice;
    payOrder(orderId: string): Promise<{
        id: string;
        user_id: number;
        status: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
}
