import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import passport from 'passport'
import { errorHandler as queryErrorHandler } from 'querymen'
import path from 'path'
import { env } from './variables'

export default (apiRoot, routes) => {
  const app = express()
  // console.log('/static' + path.join(__dirname, 'src/uploads'), 123)

  if (env !== 'test') {
    app.use(cors())
    app.use(helmet())
    app.use(morgan('tiny'))
  }
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(passport.initialize())
  app.use('/public', express.static('public'))
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  return app
}