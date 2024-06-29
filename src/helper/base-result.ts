import { ApiProperty } from '@nestjs/swagger';

export class BaseResult<T> {
    @ApiProperty()
    error: Record<string, any>;

    @ApiProperty()
    data: T;

    @ApiProperty()
    success: boolean = true;
}
