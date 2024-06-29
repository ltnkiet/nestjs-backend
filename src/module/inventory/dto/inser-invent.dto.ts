import { IsEmpty, IsNumber, IsOptional } from 'class-validator';

export class InserInventoryDto {
    @IsEmpty()
    product_id: any;

    @IsEmpty()
    shop_id: any;

    @IsOptional()
    location: string;

    @IsEmpty()
    @IsNumber()
    stock: number;
}
