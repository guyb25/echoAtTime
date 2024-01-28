import { InjectRedis } from '@nestjs-modules/ioredis'
import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'
import { appConfig } from 'src/config/app.config'
import { Message } from 'src/models/message/message'

@Injectable()
export class ScheduleQueueService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async enqueueMessage(message: Message, time: Date) {
        await this.redis.zadd(appConfig.scheduleSetName, time.getTime(), JSON.stringify(message))
    }

    async dequeueMessage(serializedMessage: string) {
        await this.redis.zrem(appConfig.scheduleSetName, serializedMessage)
    }

    async getSerializedReadyMessages(batchSize: number) {
        return await this.redis.zrangebyscore(appConfig.scheduleSetName, 0, Date.now(), 'LIMIT', 0, batchSize)
    }

    async createLock(lockId: string) {
        return await this.redis.set(this.buildLockKey(lockId), 'locked', 'EX', appConfig.schedulePollingTimeoutSeconds, 'NX')
    }

    async releaseLock(lockId: string) {
        await this.redis.del(this.buildLockKey(lockId))
    }

    private buildLockKey(lockId: string) {
        return `lock:${lockId}`
    }
}
