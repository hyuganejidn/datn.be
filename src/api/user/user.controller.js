
import { User, VotePost } from './user.model'
import Blog from '../blog/blog.model'
import Post from '../post/post.model'

import { error, notFound, success } from '../../helpers/api'
import { verifyResetPassword, getPostsVoted, getCommentsVoted, handleFollowerBlog, getBlogsOfUser } from './user.service'
import { populateUser } from './user.constants'
import { populatePost } from '../post/post.constants'

export const index = ({ querymen: { query, select, cursor } }, res) =>
  User.find(query, select, cursor)
    // .populate(populateUser)
    .then(async users => {
      const total = await User.countDocuments(query).exec()
      return { data: users, total }
    })
    .then(success(res))
    .catch(error(res))



export const showInfo = ({ params }, res) =>
  User.findById(params.id)
    .populate(populateUser())
    .then(notFound(res))
    // .then(async user => await user.userPopulate())
    .then(success(res))
    .catch(error(res))

export const showMe = ({ user }, res) => res.json(user)

export const updateMe = ({ params },) => {

}

export const updateInfo = ({ params, body, user }, res) => {
  // const { id } = params
  // const { fullName, avatarUrl } = body
  // User.findByIdAndUpdate(id, { fullName, avatarUrl }, { new: true, useFindAndModify: false })
  //   .then(user => res.status(200).json(user))
  //   .catch(err => res.status(404).json(err))
}

export const resetPassword = ({ params, body, user }, res) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => verifyResetPassword(body, result, user))
    .then(({ user, new_password }) => user.set({ password: new_password }).save())
    .then(success(res))
    .catch(error(res))


export const followBlog = ({ body, user }, res) => {
  handleFollowerBlog(user, body.blogId)
    .then(async followNum => await Blog.updateOne({ _id: body.blogId }, { $inc: { followNum } }))
    .then(success(res, 200))
    .catch(error(res))
}

export const findPostsVoted = ({ user, query }, res) =>
  getPostsVoted(user.id, query.type)
    .then(success(res))
    .catch(error(res))

export const findCommentsVoted = ({ user, query }, res) =>
  getCommentsVoted(user.id, query.post, query.type)
    .then(success(res))
    .catch(error(res))

export const findBlogs = ({ querymen, params, user }, res) =>
  getBlogsOfUser(querymen, params.id === 'me' ? user.id : params.id)
    .then(success(res))
    .catch(error(res))

export const findPostsForum = ({ querymen: { query, select, cursor }, params, user }, res) =>
  Post.find({ ...query, author: params.id, classify: 'forum' }, select, cursor)
    .populate(populatePost)
    .then(success(res))
    .catch(error(res))


