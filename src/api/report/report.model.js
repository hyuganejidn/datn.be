import mongoose from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
import { populateReport } from './report.constants'

const status = ['processing', 'processed']
const value = [0, 1, 2, 3, 4, 5, 6, 7]
const ReportSchema = mongoose.Schema(
  {
    post: { type: mongoose.Types.ObjectId, ref: 'Post', default: null },
    comment: { type: mongoose.Types.ObjectId, ref: 'Comment', default: null },
    type: { type: String, required: true },
    reports: [{
      value: { type: Number, enum: value, default: 0 },
      userReport: { type: mongoose.Types.ObjectId, ref: 'User' },
      reason: { type: String, default: '' },
      createdAt: { type: Date, required: true, default: Date.now }
    }]
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
        // delete ret.keywords
      }
    }
  }
)

ReportSchema.methods.populateReport = async function () {
  return await this.populate(populateReport).execPopulate()
}


ReportSchema.plugin(mongooseKeywords, {
  paths: ['type'],
})
const model = mongoose.model('Report', ReportSchema)
export default model