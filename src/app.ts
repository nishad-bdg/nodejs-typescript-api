import express from 'express'
import config from 'config'
import logger from './logger'
import connect  from './db/connect'
import routes from '../routes'

const port = config.get<number>('port')
const host = config.get<string>('host')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, host, async () => {
  logger.info(`app started at : http://${host}:${port}`)
  await connect()
  routes(app)
})
