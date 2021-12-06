import { Request, Response } from 'express'
import { createAccessToken, createSession } from '../service/session.service'
import { validatePassword } from '../service/user.service'
import { sign } from '../utils/jwt.utils'
import config from 'config'

export async function createSessionHandler (req: Request, res: Response) {
  //validate emaiil and password
  const user = await validatePassword(req.body)

  if (!user) {
    return res.sendStatus(401).send('Invalid username or password')
  }

  // create a session 
  const session = await createSession(user._id, req.get('user-agent') || '')
  // create access token
  const accessToken = createAccessToken({ 
    user,
    session
  })
  // create refresh token
  const refreshToken = sign(session, {
    expiresIn: config.get<string>('refreshTokenTtl')
  })
  // send refresh token back
  return res.send({ accessToken, refreshToken })
}