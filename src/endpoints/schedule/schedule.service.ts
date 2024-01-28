import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { Message } from 'src/models/message/message'
import { ScheduleQueueService } from 'src/providers/schedule-queue/schedule-queue.service'

@Injectable()
export class ScheduleService {
    constructor(private readonly scheduleQueue: ScheduleQueueService) {}

    async scheduleMessage(text: string, time: Date) {
        await this.scheduleQueue.enqueueMessage({ text: text, id: randomUUID() } as Message, time)
    }
}
