import Report from './report.model'
import { populateReport } from './report.constants'
import { error, success } from '../../helpers/api'

export const index = ({ querymen: { query, select, cursor }, params }, res) =>
  Report.find(query, select, cursor)
    .populate(populateReport)
    .then(async report => {
      const total = await Report.countDocuments(query).exec()
      return { data: report, total }
    })
    .then(success(res))
    .catch(error(res))

export const show = ({ params }, res) =>
  Report.findById(params.id)
    .populate(populateReport)
    .then(notFound(res))
    .then(success(res))
    .catch(error(res))

export const destroy = ({ params }, res) =>
  Report.findById(params.id)
    .then(notFound(res))
    .then((report) => report.remove())
    .then(success(res, 204))
    .catch(error(res))

export const destroyMany = ({ body }, res) => {
  console.log(body.ids, '123123')
  Report.deleteMany({ _id: { $in: body.ids } })
    .then(success(res, 204))
    .catch(error(res))
}