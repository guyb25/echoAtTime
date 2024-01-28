import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsString } from "class-validator"

export class ScheduleMessageDto {
    @ApiProperty({ type: 'string', format: 'date-time' })
    @Type(() => Date)
    @IsDate()
    time: Date

    @ApiProperty()
    @IsString()
    text: string
}