import path from 'path'
import { config } from 'dotenv'
config()
import { getEnv, merge } from '../helpers/common'

const MONGODB_URI = `mongodb://${getEnv('DB_HOST')}:${getEnv('DB_PORT')}/${getEnv('DB_NAME')}` || 'mongodb://127.0.0.1:27017/lykafe'
const API_PREFIX = '/v1'
const variables = {
  common: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '../../'),
    port: process.env.PORT || 9091,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '/api' + API_PREFIX,
    jwtSecret: getEnv('JWT_SECRET'),
    uri: process.env.HOST + ':' + process.env.PORT,
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    },
  },
  test: {},
  development: {
    mongo: {
      uri: MONGODB_URI,
      options: {
        debug: true
      }
    }
  },
  stag: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 9092,
    mongo: {
      uri: MONGODB_URI,
    }
  }
}
module.exports = merge(variables.common, variables[variables.common.env])
export default module.exports