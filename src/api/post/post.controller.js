import Post from './post.model'
import Comment from '../comment/comment.model'
import Topic from '../topic/topic.model'
import Blog from '../blog/blog.model'

import { error, notFound, success } from '../../helpers/api'
import { populatePost, populatePostComment } from './post.constants'
import { handleVotePost, handleUpPostNumber, handleLikePost } from './post.service'
import { populateComment } from '../comment/comment.constants'

export const index = async ({ querymen: { query, select, cursor }, params }, res) => {
  query.isBlock = params.isBlock || false
  console.log(query, select, cursor)
  Post.find(query, select, cursor)
    .populate(populatePost)
    .then(async post => {
      const total = await Post.countDocuments(query).exec()
      return { data: post, total }
    })
    .then(success(res))
    .catch(error(res))
}

export const create = async ({ body, user }, res) => {
  let data = { ...body, author: user.id }
  if (body.classify === 'forum' && body.topic) {
    const topic = await Topic.findOne({ slug: body.topic })
    data.topic = topic.id
  }
  if (body.classify === 'blog' && body.blog) {
    const blog = await Blog.findOne({ _id: body.blog })
    data.blog = blog.id
  }

  Post.create(data)
    .then(post => handleUpPostNumber(post))
    .then(success(res, 201))
    .catch(error(res))
}

export const update = async ({ params, body }, res) => {
  let data = { ...body }
  if (body.topic) {
    const topic = await Topic.findOne({ slug: body.topic })
    data.topic = topic._id
  }
  Post.findByIdAndUpdate(params.id, data, { new: true, })
    .then(post => post.populatePost())
    .then(success(res))
    .catch(error(res))
}

export const show = ({ params }, res) =>
  Post.findById(params.id)
    .populate(populatePost)
    .then(notFound(res))
    .then(post => post.set({ viewNum: ++post.viewNum }).save())
    .then(success(res))
    .catch(error(res))

export const destroy = ({ params }, res) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then((post) => post.remove())
    .then(success(res, 204))
    .catch(error(res))

export const listComment = ({ params }, res) =>
  Comment.find({ commentParent: null, userBeingReply: null, post: params.id, isBlock: false })
    .populate(populateComment)
    .then(comments => {
      comments.forEach(comment => {
        comment.commentsChild = comment.commentsChild.filter(child => !child.isBlock)
      })
      return comments
    })
    .then(comments => ({ data: comments }))
    .then(success(res))
    .catch(error(res))

export const findPostsFollowed = ({ querymen: { query, select, cursor }, user }, res) =>
  Post.find({ ...query, 'blog': { $in: user.blogsFollowing } }, select, cursor)
    .populate(populatePost)
    .then(async blogs => {
      const total = await Post.countDocuments({ ...query, 'blog': { $in: user.blogsFollowing } }).exec()
      return { data: blogs, total }
    })
    .then(success(res))
    .catch(error(res))

export const votePost = ({ params, body, user }, res) =>
  handleVotePost(params.id, user.id, body)
    .then(success(res))
    .catch(error(res))

export const likePost = ({ params, body, user }, res) =>
  handleLikePost(params.id, user.id)
    .then(success(res))
    .catch(error(res))

export const deleteMany = (req, res) =>
  Post.remove({})
    .then(success(res, 204))
    .catch(error(res))

