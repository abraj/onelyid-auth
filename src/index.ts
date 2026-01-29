import events from 'node:events'
import type http from 'node:http'
import express, { type Express } from 'express'
import { pino } from 'pino'
import { authMiddleware, type AuthMiddlewareConfig } from '@onelyid/client'
// import { oauthMiddleware } from '@onelyid/provider'

import { env } from '#/lib/env'
import { createRouter } from '#/routes'
import type { AppContext } from '#/types'

export class Server {
  constructor(
    public server: http.Server,
    public ctx: AppContext
  ) {}

  static async create() {
    const { NODE_ENV, HOST, PORT } = env
    const logger = pino({ name: 'server start' })

    const ctx = {
      logger,
    }

    // Create our server
    const app: Express = express()
    app.set('trust proxy', true)

    // Routes & middlewares
    const router = createRouter(ctx)

    const config: AuthMiddlewareConfig = {
      // dbPath: env.DB_PATH,
      // cookieSecret: env.COOKIE_SECRET,
      publicUrl: env.PUBLIC_URL,
      // logger,
      // loginRedirect: '/',
    };
    app.use(authMiddleware(config))

    // const middleware = await oauthMiddleware()
    // app.use(middleware)

    // NOTE: parse body after oauth middleware
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use(router)
    app.use((_req, res) => res.sendStatus(404))

    // Bind our server to the port
    const server = app.listen(PORT)
    await events.once(server, 'listening')
    logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`)

    return new Server(server, ctx)
  }

  async close() {
    this.ctx.logger.info('sigint received, shutting down')

    return new Promise<void>((resolve) => {
      this.server.close(() => {
        this.ctx.logger.info('server closed')
        resolve()
      })
    })
  }
}

const run = async () => {
  const server = await Server.create()

  const onCloseSignal = async () => {
    setTimeout(() => process.exit(1), 10000).unref() // Force shutdown after 10s
    await server.close()
    process.exit()
  }

  process.on('SIGINT', onCloseSignal)
  process.on('SIGTERM', onCloseSignal)
}

run()
