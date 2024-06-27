import { ProductDto } from '@module/product/dto/product.dto';

export class SPUDto extends ProductDto {
    product_id: any;
    product_variation: Array<any>;
}
