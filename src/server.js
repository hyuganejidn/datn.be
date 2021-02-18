import http from 'http'

import apiRoute from './routes'
import { express, db, winston, variablesConfig } from './configs'

const { mongo, port, apiRoot } = variablesConfig
const app = express(apiRoot, apiRoute)
const server = http.createServer(app)
const logger = winston(__filename)

setImmediate(() => {
  db.connect(mongo.uri).then(() => server.listen(port, () => {
    logger.info(`Server is running on port: ${port}`)
  }))
})
