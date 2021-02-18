import mongoose from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

import { MAX_PASSWORD, MIN_PASSWORD } from '../../constants'

const roles = ['user', 'admin']
const userSchema = mongoose.Schema({
  username: { type: String, require: true, trim: true, unique: true, lowercase: true, },
  fullName: { type: String, require: true },
  password: { type: String, require: true, trim: true, minLength: MIN_PASSWORD, maxLength: MAX_PASSWORD },
  role: { type: String, enum: roles, default: 'user' },
  avatarUrl: { type: String, default: '' },
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => {
      delete ret._id
      delete ret.password
      delete ret.keywords
    }
  }
})

// userSchema.pre('save', function (next) {
//   console.log(123123)
//   next()
// })
userSchema.methods.userPopulate = async () => {
  return await this.populate('favoriteStories').execPopulate()
}

userSchema.static = { roles }

userSchema.plugin(mongooseKeywords, { paths: ['fullName', 'username'] })
// UserSchema.plugin(mongooseKeywords, { paths: ['fullName', 'username'] })

const model = mongoose.model('User', userSchema)
export default model