import mongoose from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { populatePost } from './post.constants'
// import { populate } from './comment.constants'

const classifies = ['forum', 'blog']
const PostSchema = mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    topic: { type: mongoose.Types.ObjectId, ref: 'Topic' },
    blog: { type: mongoose.Types.ObjectId, ref: 'Blog' },
    classify: { type: String, enum: classifies, default: 'forum' },
    avatar: { type: String, default: "" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    voteNum: { type: Number, default: 0 },
    viewNum: { type: Number, default: 0 },
    commentNum: { type: Number, default: 0 },
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

PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
})

PostSchema.methods.populatePost = async function () {
  return await this.populate(populatePost).execPopulate()
}

PostSchema.methods.view = function () {
  const data = { ...this, avatar: uri + this.avatar }
  return data
}


PostSchema.pre('remove', async function (next) {
  await this.model('Comment').remove({ post: this._id })
  await this.model('VotePost').remove({ post: this._id })
  await this.model('LikePost').remove({ post: this._id })
  next()
})
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