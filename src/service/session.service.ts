import { LeanDocument } from 'mongoose'
import Session, { SessionDocument } from '../model/serssion.model'
import { UserDocument } from '../model/user.model'
import { sign } from "../utils/jwt.utils";
import config from 'config'

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ userId, userAgent})
  return session.toJSON()
}


export function createAccessToken({
  user,
  session,
}: {
  user:
    | Omit<UserDocument, "password">
    | LeanDocument<Omit<UserDocument, "password">>;
  session:
    | Omit<SessionDocument, "password">
    | LeanDocument<Omit<SessionDocument, "password">>;
}) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}