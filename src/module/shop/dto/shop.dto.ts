import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsStrongPassword,
} from 'class-validator';

class RegisterShopDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsStrongPassword()
    @ApiProperty()
    password: string;

    @ApiProperty()
    roles: [string];
}

class LoginShopDto {
    @IsOptional()
    refreshToken: null;

    @IsEmail()
    @ApiProperty()
    email: string;

    // @IsStrongPassword()
    @ApiProperty()
    password: string;
}

export { RegisterShopDto, LoginShopDto };
