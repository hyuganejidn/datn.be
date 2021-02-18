import Post from './post.model'
import { error, notFound, success } from '../../helpers/api'

export const index = async ({ querymen: { query, select, cursor } }, res) =>
  Post.find(query, select, cursor)
    .then(async post => {
      const total = await Post.countDocuments(query).exec()
      return { data: post, total }
    })
    .then(success(res))
    .catch(error(res))

export const create = async ({ body, user }, res) =>
  Post.create({ ...body, author: user.id })
    .then(success(res, 201))
    .catch(error(res))

export const show = ({ params }, res) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(error(res))

export const update = async ({ params, body }, res) =>
  Post.findByIdAndUpdate(params.id, body, { new: true, })
    .then(success(res))
    .catch(error(res))

export const destroy = ({ params }, res) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then((post) => post.remove())
    .then(success(res, 204))
    .catch(error(res))
