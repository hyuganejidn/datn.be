import Blog from '../blog/blog.model'
import Post from './post.model'
import { VotePost } from '../user/user.model'

export const handleUpPostNumber = async (post) => {
  if (post.blog && post.classify === 'blog') {
    const blog = await Blog.findById(post.blog)
    console.log(blog)
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
    return { success: true }
  } catch (error) {
    throw { message: error }
  }
}
