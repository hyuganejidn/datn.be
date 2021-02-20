import Comment from './comment.model'
import Post from '../post/post.model'
import { VoteComment } from '../user/user.model'
// import { User } from '../user/user.model'

export const createComment = async (body, userId) => {
  const { content, parentId, postId: post } = body
  const data = { content, post, author: userId, commentParent: parentId || null }
  try {
    const commentParent = parentId ? await Comment.findById(parentId) : null
    if (parentId && !commentParent) throw { parentId: 'ParentId not found' }

    const comment = await Comment.create(data)

    const postComment = await Post.findById(post)
    postComment.commentNum += 1
    postComment.save()

    if (commentParent && commentParent.commentParent) {
      comment.userBeingReply = commentParent.author
      comment.commentParent = commentParent.commentParent
      comment.save()
    }
    return comment.populateComment()
  }
  catch (error) {
    throw { errors: error }
  }
}

export const handleVoteComment = async (commentId, userId, { vote }) => {
  try {
    const comment = await Comment.findById(commentId)
    const voteComment = await VoteComment.findOne({ user: userId, comment: commentId })

    if (voteComment) {
      if (voteComment.vote === vote) {
        voteComment.remove()
        comment.voteNum += -vote
      }
      else if (voteComment.vote !== vote) {
        comment.voteNum += voteComment.vote === 1 ? -2 : 2
        voteComment.vote = vote
        voteComment.save()
      }
    } else {
      await VoteComment.create({ comment: commentId, user: userId, vote: vote })
      comment.voteNum += vote
    }
    comment.save()
    return { success: true }
  } catch (error) {
    throw { message: error }
  }
}
