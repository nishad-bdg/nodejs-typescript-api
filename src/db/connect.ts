import mongoose from 'mongoose'
import config from 'config'
import logger from '../logger'

async function connect() {
  const dbUri = config.get<string>('dbUri')
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    logger.info('db connected successfully')
  } catch (e: any) {
    logger.error('unable connect to database', e.message)
    process.exit(1)
  }
}

export default connect