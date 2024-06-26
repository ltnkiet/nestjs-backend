import {
    Body,
    Controller,
    Post,
    Req,
    UseFilters,
    UseGuards,
    UseInterceptors,
    Headers,
} from '@nestjs/common';

import { AccessService } from '@module/access/access.service';
import { LoginShopDto, RegisterShopDto } from '@module/shop/dto/shop.dto';
import {
    ApiBearerAuth,
    ApiExtraModels,
    ApiHeader,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { BaseResult } from '@helper/base-result';
import { HttpExceptionFilter } from '@helper/exception-filter';
import { Shop } from '@module/shop/schema/shop.schema';
import { EncodeDataInterceptor } from 'interceptor/encode-data';
import { AuthGuard } from './guard/auth.guard';
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
        lOGOUT SHOP
     */
    @Post('logout')
    @UseGuards(AuthGuard)
    Logout(@Req() keyStore: any) {
        return this.accessService.logout(keyStore);
    }

    @Post('handle-refreshtoken')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    HandleRefreshToken(@Req() data) {
        return this.accessService.handleRefreshToken(data);
    }
}
