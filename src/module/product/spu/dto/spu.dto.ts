import { CreateProductDto } from '@module/product/dto/product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmpty } from 'class-validator';

export class SPUDto extends CreateProductDto {
    @ApiProperty()
    @IsEmpty()
    product_id: string;

    @ApiProperty()
    @IsEmpty()
    @IsArray()
    sku_list: Array<any>;
}
