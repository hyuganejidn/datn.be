import Blog from '../blog/blog.model'
import Post from './post.model'
import { VotePost, LikePost } from '../user/user.model'

export const handleUpPostNumber = async (post) => {
  if (post.blog && post.classify === 'blog') {
    const blog = await Blog.findById(post.blog)

    if (blog) blog.set({ postNum: ++blog.postNum }).save()
  }
  return post
}

export const handleVotePost = async (postId, userId, { vote }) => {
  try {
    const post = await Post.findById(postId)
    const votePost = await VotePost.findOne({ user: userId, post: postId })

    if (votePost) {
      if (votePost.vote === vote) {
        votePost.remove()
        post.voteNum += -vote
      }
      else if (votePost.vote !== vote) {
        post.voteNum += votePost.vote === 1 ? -2 : 2
        votePost.vote = vote
        votePost.save()
      }
    } else {
      await VotePost.create({ post: post, user: userId, vote: vote })
      post.voteNum += vote
    }
    post.save()
    return { success: true, vote: post.voteNum }
  } catch (error) {
    throw { message: error }
  }
}

export const handleLikePost = async (postId, userId) => {
  try {
    const post = await Post.findById(postId)
    const likePost = await LikePost.findOne({ user: userId, post: postId })

    if (likePost) {
      likePost.remove()
      post.voteNum -= 1
    } else {
      await LikePost.create({ post: post, user: userId })
      post.voteNum += 1
    }

    post.save()
    return { success: true, vote: post.voteNum }
  } catch (error) {
    throw { message: error }
  }
}