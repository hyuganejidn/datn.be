import mongoose from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'


const ImageSchema = mongoose.Schema(
  {
    path: { type: String, required: true },
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

ImageSchema.plugin(mongooseKeywords, { paths: ['path'] })
const model = mongoose.model('Image', ImageSchema)
export default model