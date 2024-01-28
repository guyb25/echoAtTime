import { Module } from '@nestjs/common'
import { ScheduleQueueService } from './schedule-queue.service'
import { RedisModule } from '@nestjs-modules/ioredis'
import { appConfig } from 'src/config/app.config'

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: appConfig.redisUrl,
    })
  ],
  providers: [ScheduleQueueService]
})
export class ScheduleQueueModule {}
