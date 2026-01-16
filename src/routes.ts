import path from 'node:path'
import express, { Request, Response } from 'express'

import type { AppContext } from '#/types'
import { page } from '#/lib/view'
import { error } from './pages/error'
import { home } from '#/pages/home'

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
      // next(err)
      renderError(err, req, res)
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
      return res.type('html').send(page(home({})))
    })
  )

  return  router
}

function renderError(err: unknown, req: Request, res: Response) {
  let message: string
  let stack: string
  const isProd = req.app.get('env') !== 'development'
  if (err instanceof Error) {
    message = err.message;
    stack = (isProd ? '' : err.stack) ?? '';
  } else {
    message = 'Unknown error';
    stack = isProd ? '' : String(err);
  }
  res.type('html').send(page(error({ message, stack })))
}
