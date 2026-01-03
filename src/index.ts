import { pino } from 'pino'

import { env } from '#/lib/env'

const run = () => {
  const { NODE_ENV, HOST, PORT } = env
  const logger = pino({ name: 'server start' })

  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`)
  console.log('Hello..');
}

run()
