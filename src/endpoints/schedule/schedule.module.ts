import { Module } from '@nestjs/common'
import { ScheduleController } from './schedule.controller'
import { ScheduleService } from './schedule.service'
import { RedisModule } from '@nestjs-modules/ioredis'
import { appConfig } from 'src/config/app.config'
import { ScheduleQueueModule } from 'src/providers/schedule-queue/schedule-queue.module'
import { ScheduleQueueService } from 'src/providers/schedule-queue/schedule-queue.service'

@Module({
  imports: [
    ScheduleQueueModule,
    RedisModule.forRoot({
      type: 'single',
      url: appConfig.redisUrl,
    }),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleQueueService]
})
export class ScheduleModule {}
