import { pino } from 'pino'

const run = () => {
  const logger = pino({ name: 'server start' })

  logger.info(`Server started..`);
  console.log('Hello..');
}

run()
