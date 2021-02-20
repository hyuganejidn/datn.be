import mongoose from 'mongoose'

const connect = (dbURI) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: false,
  }
  return mongoose.connect(dbURI, options)
    .then(connection => connection)
    .catch(err => console.log('Connect DB got error! URI: ' + dbURI + '\n' + err))
}

export default { connect }