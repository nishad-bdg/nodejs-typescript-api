import mongoose from 'mongoose'
import { UserDocument } from './user.model'

export interface SessionDocument extends mongoose.Document {
  user: UserDocument['id'],
  valid: boolean,
  userAgent: string,
  createdAt: Date,
  updatedAt: Date
}

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  valid: { type: String, default: true },
  userAgent: { type: String }
})


const Session = mongoose.model<SessionDocument>('Session', sessionSchema)

export default Session