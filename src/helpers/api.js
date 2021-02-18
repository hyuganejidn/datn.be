import { winston } from '../configs'
const logger = winston(__filename)

export const success = (res, status) => (entity) => {
  if (entity) {
    console.log(entity, "entity")
    res.status(status || 200).json(entity)
  }
  return null
}

export const error = (res, status) => (errors) => {
  logger.error(`Request error. Status: ${status || 400}\n ${JSON.stringify(errors)}`)
  return res.status(status || 400).json(errors)
}

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  logger.error(`Not Found 404`)
  res.status(404).end()
  return null
}

