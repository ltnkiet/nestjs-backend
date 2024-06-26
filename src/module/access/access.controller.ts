import {
    Body,
    Controller,
    Post,
    Req,
    UseFilters,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { AccessService } from '@module/access/access.service';
import { LoginShopDto, RegisterShopDto } from '@module/shop/dto/shop.dto';
import {
    ApiExtraModels,
    ApiOkResponse,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { BaseResult } from '@helper/base-result';
import { HttpExceptionFilter } from '@helper/exception-filter';
import { Shop } from '@module/shop/entity/shop.schema';
import { EncodeDataInterceptor } from 'interceptor/encode-data';
import { AuthGuard } from '@guard/auth.guard';
import { HandleRefreshTokenDto } from './dto/access.dto';

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
                    $ref: getSchemaPath(RegisterShopDto),
                },
            },
        },
    })
    @UseInterceptors(EncodeDataInterceptor)
    Register(@Body() data: RegisterShopDto) {
        return this.accessService.register(data);
    }

    /**
        LOGIN SHOP
     */
    @Post('login')
    @ApiOkResponse({
        schema: {
            $ref: getSchemaPath(BaseResult),
            properties: {
                data: {
                    $ref: getSchemaPath(LoginShopDto),
                },
            },
        },
    })
    Login(@Body() data: LoginShopDto) {
        return this.accessService.login(data);
    }

    /**
        LOGOUT SHOP
     */
    @Post('logout')
    @UseGuards(AuthGuard)
    @ApiOkResponse({
        schema: {
            $ref: getSchemaPath(BaseResult),
        },
    })
    Logout(@Req() req) {
        return this.accessService.logout(req.keyStore);
    }

    @ApiOkResponse({
        schema: {
            $ref: getSchemaPath(BaseResult),
        },
    })
    @Post('handle-refresh-token')
    @UseGuards(AuthGuard)
    HandleRefreshToken(@Req() data: HandleRefreshTokenDto) {
        return this.accessService.handleRefreshToken(data);
    }
}
