import mongoose from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
// import { populate } from './comment.constants'

const classifies = ['forum', 'blog']
const PostSchema = mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    classify: { type: String, enum: classifies, default: 'forum' },
    topic: { type: mongoose.Types.ObjectId, ref: 'Topic', default: null },
    blog: { type: mongoose.Types.ObjectId, ref: 'Blog', default: null },
    avatar: { type: String, default: "" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    vote_num: { type: Number, default: 0 },
    view_num: { type: Number, default: 0 },
    comment_num: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
        delete ret.keywords
      }
    }
  }
)

// PostSchema.methods.populateComment = async function () {
//   return await this.populate(populate).execPopulate()
// }

// PostSchema.methods.populateAuthor = async function () {
//   const result = await this.populate('author').execPopulate()
//   return result
// }

PostSchema.plugin(mongooseKeywords, { paths: ['title'] })
const model = mongoose.model('Post', PostSchema)
export default model