import {
    Body,
    Controller,
    Post,
    Req,
    UseFilters,
    UseGuards,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/product.dto';
import { AuthGuard } from '@guard/auth.guard';
import {
    ApiExtraModels,
    ApiOkResponse,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from '@helper/exception-filter';
import { BaseResult } from '@helper/base-result';
import { Product } from './entity/product.schema';

@ApiTags('Product')
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(BaseResult, Product)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('create')
    @ApiOkResponse({
        schema: {
            $ref: getSchemaPath(BaseResult),
            properties: {
                data: {
                    $ref: getSchemaPath(CreateProductDto),
                },
            },
        },
    })
    @UseGuards(AuthGuard)
    create(@Req() req: any, @Body() data: CreateProductDto) {
        return this.productService.createProduct(data.product_type, {
            ...data,
            product_shop: req.shop.shopId,
        });
    }
}
