import mongoose from 'mongoose'
// import { winston } from '../configs'
// const logger = winston(__filename)

const connect = (dbURI) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
  return mongoose.connect(dbURI, options)
    .then(connection => connection)
    // .catch(err => logger.error('Connect DB got error! URI: ' + dbURI + '\n' + err))
}

export default { connect }