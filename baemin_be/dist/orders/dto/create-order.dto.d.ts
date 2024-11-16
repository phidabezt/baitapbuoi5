declare class CreateOrderItemDto {
    id: string;
    quantity: number;
}
export declare class CreateOrderDto {
    user_id: number;
    status?: string;
    items: CreateOrderItemDto[];
}
export {};
