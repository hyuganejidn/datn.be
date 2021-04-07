import mongoose from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

import { MAX_PASSWORD, MIN_PASSWORD } from '../../constants'
import { populateUser } from './user.constants'

const roles = ['user', 'admin']
const UserSchema = mongoose.Schema({
  username: { type: String, require: true, trim: true, unique: true, lowercase: true, },
  fullName: { type: String, require: true },
  introduction: { type: String, default: "" },
  password: { type: String, require: true, trim: true, minLength: MIN_PASSWORD, maxLength: MAX_PASSWORD },
  role: { type: String, enum: roles, default: 'user' },
  isBlock: { type: Boolean, default: false },
  avatarUrl: { type: String, default: '' },
  blogsFollowing: [{ type: mongoose.Types.ObjectId, ref: 'Blog' }],
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

UserSchema.virtual('votePosts', {
  ref: 'VotePost',
  localField: '_id',
  foreignField: 'user',
})

UserSchema.virtual('voteComments', {
  ref: 'VoteComment',
  localField: '_id',
  foreignField: 'user',
})

UserSchema.methods.userPopulate = async function () {
  return await this.populate(populateUser).execPopulate()
}

UserSchema.static = { roles }

UserSchema.plugin(mongooseKeywords, { paths: ['fullName', 'username', 'introduction'] })

const eVote = [-1, 1]
const VoteCommentSchema = mongoose.Schema({
  comment: { type: mongoose.Types.ObjectId, ref: 'Comment', required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  vote: { type: Number, enum: eVote, required: true }
}, {
  versionKey: false,
  toJSON: {
    transform: (obj, ret) => {
      delete ret._id
      delete ret.user
    }
  }
})

const VotePostSchema = mongoose.Schema({
  post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  vote: { type: Number, enum: eVote, required: true }
}, {
  versionKey: false,
  toJSON: {
    transform: (obj, ret) => {
      delete ret._id
      delete ret.user
    }
  }
})

const LikePostSchema = mongoose.Schema({
  post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
}, {
  versionKey: false,
  toJSON: {
    transform: (obj, ret) => {
      delete ret._id
      delete ret.user
    }
  }
})

const LikeCommentSchema = mongoose.Schema({
  comment: { type: mongoose.Types.ObjectId, ref: 'Comment', required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
}, {
  versionKey: false,
  toJSON: {
    transform: (obj, ret) => {
      delete ret._id
      delete ret.user
    }
  }
})

export const User = mongoose.model('User', UserSchema)
export const VotePost = mongoose.model('VotePost', VotePostSchema)
export const LikePost = mongoose.model('LikePost', LikePostSchema)
export const VoteComment = mongoose.model('VoteComment', VoteCommentSchema)
export const LikeComment = mongoose.model('LikeComment', LikeCommentSchema)