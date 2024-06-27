import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {

    @ApiProperty()
    product_name: string;

    @ApiProperty()
    product_slug: string;

    @ApiProperty()
    product_thumb: string;

    @ApiProperty()
    product_description: string;

    @ApiProperty()
    product_quantity: number;

    @ApiProperty()
    product_price: number;

    @ApiProperty()
    product_type: string;

    @ApiProperty()
    product_shop: string;

    product_attributes: any;

    @ApiProperty()
    product_ratingAverage: number;

    @ApiProperty()
    product_variation: Array<string>;

    isDraft: true;

    isPublished: false;
}