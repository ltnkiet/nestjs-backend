import {
    Body,
    Controller,
    Post,
    Req,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@guard/auth.guard';
import { SPUService } from './spu.service';
import { SPUDto } from './dto/spu.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@helper/exception-filter';
import { BaseResult } from '@helper/base-result';
import { SPU } from './entity/spu.schema';

@ApiTags('Product')
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(BaseResult, SPU)
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
