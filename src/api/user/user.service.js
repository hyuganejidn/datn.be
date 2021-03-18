import validator from 'validator'
import bcryptjs from 'bcryptjs'

import { MIN_PASSWORD, MAX_PASSWORD } from '../../constants'
import { hashPassword } from '../auth/auth.service'
import Blog from '../blog/blog.model'
import { VoteComment, VotePost, LikePost, LikeComment } from './user.model'
import { populateBlog } from '../blog/blog.constants'

export const verifyResetPassword = async (payload, data, user) => {
  const { new_password, new_passwordConfirm, password } = payload

  const isSelfUpdate = user.role === 'user' && user.id !== data.id
  if (isSelfUpdate) throw {
    valid: false,
    param: 'password',
    message: 'You can\'t change other user\'s password'
  }

  const isPasswordCorrect = await bcryptjs.compare(password, data.password)
  if (!isPasswordCorrect) throw { password: 'Password is incorrect.' }

  const errors = verifyNewPassword(password, new_password, new_passwordConfirm)
  if (Object.keys(errors).length) throw errors

  const securePassword = await hashPassword(new_password)
  return {
    user: data,
    new_password: securePassword
  }
}

export const verifyNewPassword = (password, new_password, new_passwordConfirm) => {
  const errors = {}
  if (!new_password) {
    errors.new_password = 'New password field is required.'
  }
  else {
    if (new_password === password) {
      errors.new_password = 'New password is the same as current password.'
    }
    const isEnoughLength = validator.isLength(new_password, {
      min: MIN_PASSWORD,
      max: MAX_PASSWORD,
    })
    if (!isEnoughLength) {
      errors.new_password = `Password need at least ${MIN_PASSWORD} character and less than ${MAX_PASSWORD} character`
    }
  }
  if (!new_passwordConfirm || !validator.equals(new_passwordConfirm, new_password)) {
    errors.new_passwordConfirm = 'New password confirm is not match.'
  }

  return errors
}

export const handleFollowerBlog = async (user, blogId) => {
  try {
    const blogsOfUser = await Blog.find({ author: user.id })
    if (blogsOfUser.some(blog => blog.id === blogId)) {
      throw { errors: { message: 'Not follow blog of yourself' } }
    }

    const indexBlog = user.blogsFollowing.indexOf(blogId)

    if (~indexBlog) await user.updateOne({ $pull: { blogsFollowing: blogId } })
    else await user.updateOne({ $push: { blogsFollowing: blogId } })

    return indexBlog === -1 ? 1 : -1
  } catch (error) {
    throw { errors: error }
  }
}

export const getPostsVoted = async (userId, type) => {
  try {
    let vote
    if (type === 'forum') {
      vote = await VotePost.find({ user: userId })
        .populate('post', 'classify')
    } else {
      vote = await LikePost.find({ user: userId })
        .populate('post', 'classify')
    }
    const votePostObj = vote
      .filter(item => item.post && item.post.classify === type)
      .reduce((cur, acc) => ({ ...cur, [acc.post.id]: type === 'forum' ? acc.vote : 1 }), {})



    return votePostObj
  } catch (error) {
    throw { errors: error }
  }
}

export const getCommentsVoted = async (userId, postId, type) => {
  try {
    let vote
    if (type === 'forum') {
      vote = await VoteComment.find({ user: userId }).populate('comment', 'post')
    } else {
      vote = await LikeComment.find({ user: userId }).populate('comment', 'post')
    }

    const voteCommentObj = vote
      .filter(item => item.comment.post + "" === postId)
      .reduce((cur, acc) => ({ ...cur, [acc.comment._id]: type === 'forum' ? acc.vote : 1 }), {})

    return voteCommentObj
  } catch (error) {
    throw { errors: error }
  }
}

export const getBlogsOfUser = async ({ query, select, cursor }, userId) => {
  try {
    console.log({ ...query, author: userId })
    const blogs = await Blog.find({ ...query, author: userId }, select, cursor).populate(populateBlog)
    const total = await Blog.countDocuments({ ...query, author: userId }).exec()

    return { data: blogs, total }
  } catch (error) {
    throw { errors: error }
  }
}