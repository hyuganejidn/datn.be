import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import passport from 'passport'
import { errorHandler as queryErrorHandler } from 'querymen'

import { env } from './variables'

export default (apiRoot, routes) => {
  const app = express()
  if (env !== 'test') {
    app.use(cors())
    app.use(helmet())
    app.use(morgan('tiny'))
  }
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(passport.initialize())
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  return app
}