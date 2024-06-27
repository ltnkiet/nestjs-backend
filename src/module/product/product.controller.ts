import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { AuthGuard } from '@guard/auth.guard';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) {}

    @Post('create')
    @UseGuards(AuthGuard)
    create(@Req() req, @Body() data: ProductDto) {
        return this.productService.createProduct(data.product_type, {
            ...data,
            product_shop: req.shop.shopId,
        });
    }

}
