import mongoose from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

// import { populate } from './comment.constants'

const TopicSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  {
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

// TopicSchema.methods.populateComment = async function () {
//   return await this.populate(populate).execPopulate()
// }

// TopicSchema.methods.populateAuthor = async function () {
//   const result = await this.populate('author').execPopulate()
//   return result
// }
TopicSchema.plugin(mongooseKeywords, { paths: ['name', 'slug'] })
const model = mongoose.model('Topic', TopicSchema)
export default model