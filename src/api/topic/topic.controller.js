import Topic from './topic.model'
import { error, notFound, success } from '../../helpers/api'

export const index = async ({ querymen: { query, select, cursor } }, res) =>
  Topic.find(query, select, cursor)
    .then(async topic => {
      const total = await Topic.countDocuments(query).exec()
      return { data: topic, total }
    })
    .then(success(res))
    .catch(error(res))


export const create = async ({ body }, res) =>
  Topic.create({ ...body })
    .then(success(res, 201))
    .catch(error(res))

export const show = ({ params }, res) =>
  Topic.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(error(res))

export const update = async ({ params, body }, res) =>
  Topic.findByIdAndUpdate(params.id, body, { new: true, })
    .then(success(res))
    .catch(error(res))

export const destroy = ({ params }, res) =>
  Topic.findById(params.id)
    .then(notFound(res))
    .then((topic) => topic.remove())
    .then(success(res, 204))
    .catch(error(res))
