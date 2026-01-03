import type { Logger } from 'pino'

// Application state passed to the router and elsewhere
export type AppContext = {
  logger: Logger
}
