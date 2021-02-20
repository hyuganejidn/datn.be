import Comment from './comment.model'
import { populateComment } from './comment.constants'

import { error, notFound, success } from '../../helpers/api'
import { createComment, handleVoteComment } from './comment.service'

export const index = (req, res) =>
  Comment.find({ commentParent: null, userBeingReply: null })
    .populate(populateComment)
    .then(comments => ({ data: comments }))
    .then(success(res))
    .catch(error(res))


export const getById = ({ params }, res) =>
  Comment.findById(params.id)
    .then(notFound(res))
    .then(async comments => await comments.populateComment())
    .then(success(res))
    .catch(error(res))


export const create = async ({ body, user }, res) =>
  createComment(body, user.id)
    .then(success(res))
    .catch(error(res))


export const vote = ({ params, body, user }, res) =>
  handleVoteComment(params.id, user.id, body)
    .then(success(res))
    .catch(error(res))


export const destroy = async ({ params, user, body }, res, next) =>
  Comment.findOne({ _id: params.id, author: user.id })
    .then(notFound(res))
    .then(comment => comment.remove())
    .then(success(res, 204))
    .catch(error(res))


export const removeAll = async (req, res) =>
  Comment.remove({})
    .then(success(res, 204))
    .catch(error(res))
