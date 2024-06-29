import { IsNumber, IsEmpty, IsOptional } from 'class-validator';

export class getAllDiscountByShopDto {
    @IsEmpty()
    shopId: string;

    @IsNumber()
    limit: number;

    @IsNumber()
    page: number;
}

export class getAllDiscountWithProductDto {
    @IsEmpty()
    code: string;

    @IsEmpty()
    shopId: any;

    @IsEmpty()
    userId: any;

    @IsNumber()
    limit: number;

    @IsNumber()
    page: number;
}

export class getAllDiscountUnSelectDto {
    @IsEmpty()
    @IsNumber()
    limit: number;

    @IsEmpty()
    sort: any;

    @IsEmpty()
    @IsNumber()
    page: number;

    @IsEmpty()
    filter: any;

    @IsOptional()
    @IsEmpty()
    unSelect: Array<string>;
}

export class getAllDiscountSelectDto {
    @IsEmpty()
    @IsNumber()
    limit: number;

    @IsEmpty()
    sort: any;

    @IsEmpty()
    @IsNumber()
    page: number;

    @IsEmpty()
    filter: any;

    @IsOptional()
    @IsEmpty()
    select: Array<string>;
}

export class getDiscountAmountDto {
    @IsEmpty()
    codeId: string;

    @IsEmpty()
    shopId: string;

    @IsEmpty()
    userId: string;

    @IsEmpty()
    products: any;

}
