import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@guard/auth.guard';
import { SPUService } from './spu.service';
import { SPUDto } from './dto/spu.dto';

@Controller('product/spu')
export class SPUController {
    constructor(private readonly spuService: SPUService) {}

    @Post('new')
    @UseGuards(AuthGuard)
    createSpu(@Req() req, @Body() data: SPUDto) {
        return this.spuService.newSpu({
            ...data,
            product_shop: req.shop.shopId,
        });
    }
}
