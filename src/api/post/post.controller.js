import Post from './post.model'
import { User } from '../user/user.model'

import { error, notFound, success } from '../../helpers/api'
import { populatePost } from './post.constants'
import { handleVotePost, handleUpNumPost } from './post.service'

export const index = async ({ querymen: { query, select, cursor }, params }, res) => {
  // const _query = params.classify ? { ...query, classify: params.classify } : query
  console.log(query, select, cursor, params)
  Post.find(query, select, cursor)
    .populate(populatePost)
    .then(async post => {
      const total = await Post.countDocuments(query).exec()
      return { data: post, total }
    })
    .then(success(res))
    .catch(error(res))
}

export const create = async ({ body, user }, res) =>
  Post.create({ ...body, author: user.id })
    .then(post => handleUpNumPost(post))
    .then(success(res, 201))
    .catch(error(res))

export const show = ({ params }, res) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then(post => post.set({ viewNum: ++post.viewNum }).save())
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

export const votePost = ({ params, body, user }, res) =>
  handleVotePost(params.id, user.id, body)
    .then(success(res))
    .catch(error(res))

export const likePost = ({ params, body, user }) => console.log(params, body)