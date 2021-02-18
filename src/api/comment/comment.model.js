import mongoose from 'mongoose'
import { populate } from './comment.constants'

const schema = mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    commentParent: { type: mongoose.Types.ObjectId, ref: 'Comment', default: null },
    commentChildren: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    content: { type: String, required: true },
    like_num: { type: Number },
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

schema.methods.populateComment = async function () {
  return await this.populate(populate).execPopulate()
}

// schema.methods.populateAuthor = async function () {
//   const result = await this.populate('author').execPopulate()
//   return result
// }

const model = mongoose.model('Comment', schema)
export default model