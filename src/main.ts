import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { Printer } from './printer/printer'
import { appConfig } from './config/app.config'
import { ScheduleQueueService } from './providers/schedule-queue/schedule-queue.service'
import { swaggerConfig } from './config/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ 
    transform: true, 
    forbidNonWhitelisted: true 
  }))

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('', app, document)

  const printer = new Printer(app.get(ScheduleQueueService))
  setInterval(() => printer.printBatch(), appConfig.schedulePollingInterval)

  await app.listen(appConfig.apiPort)
}

bootstrap()
