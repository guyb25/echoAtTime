import 'dotenv/config'

export const appConfig =  {
    redisUrl: process.env['REDIS_URL'],
    scheduleSetName: process.env['REDIS_SCHEDULE_SET_NAME'],
    schedulePollingInterval: parseInt(process.env['SCHEDULE_POLLING_INTERVAL']),
    schedulePollingBatchSize: parseInt(process.env['SCHEDULE_POLLING_BATCH_SIZE']),
    schedulePollingTimeoutSeconds: parseInt(process.env['SCHEDULE_POLLING_LOCK_TIMEOUT_SECONDS']),
    apiPort: parseInt(process.env['API_PORT']),
}