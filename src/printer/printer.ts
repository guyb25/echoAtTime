import { appConfig } from "src/config/app.config"
import { Message } from "src/models/message/message"
import { ScheduleQueueService } from "src/providers/schedule-queue/schedule-queue.service"

export class Printer {
    constructor(private readonly scheduleQueue: ScheduleQueueService) {}

    async printBatch() {
        const serializedMessages = await this.scheduleQueue.getSerializedReadyMessages(appConfig.schedulePollingBatchSize)

        for (const serializedMessage of serializedMessages) {
            const message = JSON.parse(serializedMessage) as Message
            console.log(message)
            const isLockCreated = await this.scheduleQueue.createLock(message.id)

            if (isLockCreated) {
                console.log(message.text)
                await this.scheduleQueue.dequeueMessage(serializedMessage)
                await this.scheduleQueue.releaseLock(message.id)
            }
        }
    }
}