import mongoose from 'mongoose'
import { populateComment } from './comment.constants'

const CommentSchema = mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    commentParent: { type: mongoose.Types.ObjectId, ref: 'Comment', default: null },
    userBeingReply: { type: mongoose.Types.ObjectId, default: null, ref: 'User' },
    content: { type: String, required: true },
    voteNum: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
        delete ret.keywords
        delete ret.commentParent
      }
    }
  }
)

CommentSchema.virtual('commentsChild', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'commentParent',
})

CommentSchema.methods.populateComment = async function () {
  return await this.populate(populateComment).execPopulate()
}

CommentSchema.pre('remove', async function (next) {
  await this.model('VoteComment').remove({ comment: this._id })
  await this.model('Comment').remove({ commentParent: this._id })
  next()
})

// CommentSchema.methods.populateAuthor = async function () {
//   const result = await this.populate('author').execPopulate()
//   return result
// }

const model = mongoose.model('Comment', CommentSchema)
export default model