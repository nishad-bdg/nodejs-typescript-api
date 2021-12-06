import { Request, Response, Express } from 'express'
import { createSessionHandler } from './src/controller/session.controller'
import { createUserHandler } from './src/controller/user.controller'
import validateRequest from './src/middleware/validateRequest'
import { createUserSchema, createUserSessionSchema } from './src/schema/user.schema'

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler)
  app.post('/api/sessions', validateRequest(createUserSessionSchema), createSessionHandler)
}