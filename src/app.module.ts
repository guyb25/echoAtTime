import { Module } from '@nestjs/common'
import { ScheduleModule } from './endpoints/schedule/schedule.module'
import { ScheduleQueueModule } from './providers/schedule-queue/schedule-queue.module'

@Module({
  imports: [
    ScheduleModule,
    ScheduleQueueModule
  ],
})
export class AppModule {}
