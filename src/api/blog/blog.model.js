import mongoose from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { populateBlog } from './blog.constants'

const BlogSchema = mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    avatar: { type: String, required: true },
    cover: { type: String, default: "" },
    slug: { type: String, required: true, unique: true, lowercase: true },
    info: { type: String, default: "" },
    followNum: { type: Number, default: 0 },
    postNum: { type: Number, default: 0 },
    // userFollowing: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
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

// BlogSchema.virtual('Post', {
//   ref: 'Comment',
//   localField: '_id',
//   foreignField: 'story',
//   options: {
//     sort: { updatedAt: -1 }
//   }
// })
// BlogSchema.methods.populateComment = async function () {
//   return await this.populate(populate).execPopulate()
// }
BlogSchema.pre('remove', async function (next) {
  await this.model('Post').remove({ blog: this._id })
  next()
})
// BlogSchema.methods.populateAuthor = async function () {
//   const result = await this.populate('author').execPopulate()
//   return result
// }

BlogSchema.methods.populateBlog = async function () {
  return await this.populate(populateBlog).execPopulate()
}

BlogSchema.plugin(mongooseKeywords, { paths: ['title', 'slug'] })
const model = mongoose.model('Blog', BlogSchema)
export default model