import { DocumentBuilder } from "@nestjs/swagger"

export const swaggerConfig = new DocumentBuilder()
.setTitle('Message Scheduler')
.setDescription('API for scheduling message prints')
.setVersion('1.0')
.addTag('message scheduler')
.build()