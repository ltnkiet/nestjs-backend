import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AccessService } from '@module/access/service/access.service';
import { RegisterShopDto } from '@module/shop/dto/shop.dto'

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post('register')
  register(@Body() data: RegisterShopDto) {
    return this.accessService.register(data);
  }

}
