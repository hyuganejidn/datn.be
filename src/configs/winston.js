import path from 'path'
import { createLogger, format, transports, addColors } from 'winston'

import { env } from './variables'
const { combine, timestamp, label, colorize, printf, prettyPrint } = format
/*
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};
*/
const logFormat = printf(({ level, message, label, timestamp, stack }) => {
  if (typeof message === 'object') message = JSON.stringify(message)
  const mesLog = `${timestamp} [${label}] ${level}: ${message}`

  if (stack) return mesLog + ' Stack: ' + stack
  return mesLog
})

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
})

export default (callerFile) => createLogger({
  level: ['development', 'test'].includes(env) ? 'error' : 'debug',
  transports: [
    new transports.Console({
      level: 'info',
      format: combine(
        label({ label: path.basename(callerFile) }),
        colorize(),
        prettyPrint(),
        timestamp({ format: 'HH:mm:ss' }),
        logFormat
      )
    })
  ]
})