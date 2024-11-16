import { IsInt, IsNotEmpty, IsOptional, IsString, IsArray, ValidateNested, Min } from 'class-validator';

class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsArray()
  @ValidateNested({ each: true })
  items: CreateOrderItemDto[];
}
