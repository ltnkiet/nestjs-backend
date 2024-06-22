import { ApiProperty } from '@nestjs/swagger'

export class BaseResult<T> {
    @ApiProperty()
    data: T

    @ApiProperty()
    success: boolean = true

    @ApiProperty()
    error: Record<string, any>
}