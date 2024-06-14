import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

class RegisterShopDto {
    @IsNotEmpty()
    name: string
  
    @IsEmail()
    email: string
  
    @MinLength(8)
    password: string

    @IsNotEmpty()
    roles: [string]
}

export { RegisterShopDto }