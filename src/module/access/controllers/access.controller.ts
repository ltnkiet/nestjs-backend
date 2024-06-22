import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Res,
    UseFilters,
} from '@nestjs/common';

import { AccessService } from '@module/access/service/access.service';
import { LoginShopDto, RegisterShopDto } from '@module/shop/dto/shop.dto';
import {
    ApiExtraModels,
    ApiOkResponse,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { BaseResult } from '@core/base.result';
import { HttpExceptionFilter } from '@config/app.filter';
import { Shop } from '@module/shop/schema/shop.schema';

@ApiTags('Access')
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(BaseResult, Shop)
@Controller('access')
export class AccessController {
    constructor(private readonly accessService: AccessService) {}

    @Post('register')
    @ApiOkResponse({
        schema: {
            $ref: getSchemaPath(BaseResult),
            properties: {
                data: {
                    $ref: getSchemaPath(Shop),
                },
            },
        },
    })
    Register(@Res() res, @Body() data: RegisterShopDto) {
        const result = this.accessService.register(data);
        return res.json(result);
    }

    @Post('login')
    Login(@Body() data: LoginShopDto) {
        return this.accessService.login(data);
    }

    @Post('logout')
    Logout(@Body() _id: any) {
        return this.accessService.logout(_id);
    }
}
