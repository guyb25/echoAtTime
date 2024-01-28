import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ScheduleService } from './schedule.service'
import { ScheduleMessageDto } from 'src/models/dtos/schedule-message.dto'

@Controller('schedule')
@ApiTags('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @Post('/echoAtTime')
    @HttpCode(HttpStatus.ACCEPTED)
    async schedule(@Body() dto: ScheduleMessageDto) {
        await this.scheduleService.scheduleMessage(dto.text, dto.time)
    }
}
