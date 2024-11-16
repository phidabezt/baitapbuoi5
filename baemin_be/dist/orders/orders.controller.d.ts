import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        id: string;
        user_id: number;
        status: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
    payOrder(id: string): Promise<{
        id: string;
        user_id: number;
        status: string | null;
        created_at: Date | null;
        updated_at: Date | null;
    }>;
}
