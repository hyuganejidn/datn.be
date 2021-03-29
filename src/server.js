import http from 'http'
import socketIO from 'socket.io'
import apiRoute from './routes'
import { express, db, winston, variablesConfig } from './configs'
import { catchEvent } from './socket'
const { mongo, port, apiRoot } = variablesConfig
const app = express(apiRoot, apiRoute)
const server = http.createServer(app)
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:9000",
    credentials: true
  }
})
const logger = winston(__filename)


catchEvent(io)
setImmediate(() =>
  db.connect(mongo.uri)
    .then(() => server.listen(port, () =>
      logger.info(`Server is running on port: ${port}`)
    ))
)
