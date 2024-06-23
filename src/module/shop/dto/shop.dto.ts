import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

class RegisterShopDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string
  
    @IsEmail()
    @ApiProperty()
    email: string
  
    @MinLength(8)
    @ApiProperty()
    password: string

    @ApiProperty()
    roles: [string]
}

class LoginShopDto {
    refreshToken: null
  
    @IsEmail()
    @ApiProperty()
    email: string
  
    @MinLength(8)
    @ApiProperty()
    password: string
}

class findShopDto {
    @IsEmail()
    @ApiProperty()
    email: string
}

export { RegisterShopDto, LoginShopDto, findShopDto }