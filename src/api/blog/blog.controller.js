import Blog from './blog.model'
import { User } from '../user/user.model'
import Post from '../post/post.model'
import { error, notFound, success } from '../../helpers/api'
import { populatePost } from '../post/post.constants'
import { getUsersFollowedBlog } from './blog.service'
import { populateBlog } from './blog.constants'

export const index = async ({ querymen: { query, select, cursor } }, res) =>
  Blog.find(query, select, cursor)
    .populate(populateBlog)
    .then(async blog => {
      const total = await Blog.countDocuments(query).exec()
      return { data: blog, total }
    })
    .then(success(res))
    .catch(error(res))


export const create = async ({ body, user }, res,) =>
  Blog.create({ ...body, author: user.id })
    .then(success(res, 201))
    .catch(error(res))


export const show = ({ params }, res) =>
  Blog.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(error(res))


export const update = async ({ params, body }, res) => {
  Blog.findByIdAndUpdate(params.id, body, { new: true, })
    .then(success(res))
    .catch(error(res))
}


export const findUsersFollowed = ({ params }, res) =>
  getUsersFollowedBlog(params.id)
    .then(success(res))
    .catch(error(res))


export const destroy = ({ params }, res) =>
  Blog.findById(params.id)
    .then(notFound(res))
    .then((blog) => blog.remove())
    .then(success(res, 204))
    .catch(error(res))


export const findPost = async ({ querymen: { query, select, cursor }, params }, res) =>
  Post.find({ ...query, blog: params.id }, select, cursor)
    .populate(populatePost)
    .then(async posts => {
      const total = await Post.countDocuments({ ...query, blog: params.id }).exec()
      return { data: posts, total }
    })
    .then(success(res))
    .catch(error(res))

