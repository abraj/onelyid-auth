import path from 'node:path'
import express from 'express'

import type { AppContext } from '#/types'

// Helper function for defining routes
const handler =
  (fn: express.Handler) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await fn(req, res, next)
    } catch (err) {
      next(err)
    }
  }

export const createRouter = (ctx: AppContext) => {
  const router = express.Router()

  // Static assets
  router.use('/public', express.static(path.join(__dirname, 'pages', 'public')))

  // Home page
  router.get(
    '/',
    handler(async (_req, res) => {
      return res.send('Home page')
    })
  )

  return  router
}
