import { IsEmpty, IsOptional, IsNumber } from 'class-validator';

export class findAllProductDto {
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
