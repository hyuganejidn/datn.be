import mongoose from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { populatePost } from './post.constants'
// import { populate } from './comment.constants'

const classifies = ['forum', 'blog']
const PostSchema = mongoose.Schema(
  {
    avatar: { type: String, default: "" },
    voteNum: { type: Number, default: 0 },
    viewNum: { type: Number, default: 0 },
    title: { type: String, required: true },
    commentNum: { type: Number, default: 0 },
    content: { type: String, required: true },
    isBlock: { type: Boolean, default: false },
    blog: { type: mongoose.Types.ObjectId, ref: 'Blog' },
    topic: { type: mongoose.Types.ObjectId, ref: 'Topic' },
    classify: { type: String, enum: classifies, default: 'forum' },
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
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

PostSchema.virtual('reports', {
  ref: 'Report',
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

PostSchema.plugin(mongooseKeywords, { paths: ['title', 'content'] })
const model = mongoose.model('Post', PostSchema)
export default model