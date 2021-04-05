import { Router } from 'express'
import { middleware as query } from 'querymen'

import Post from '../post/post.model'
import Blog from '../blog/blog.model'
import { User } from '../user/user.model'
import { populatePost } from '../post/post.constants'
import { populateUser } from '../user/user.constants'
import { populateBlog } from '../blog/blog.constants'

const router = new Router()


const index = async ({ querymen: { query, select, cursor } }, res) => {
  try {
    const blogs = await Blog.find(query, select, cursor).populate(populateBlog)
    const posts = await Post.find(query, select, cursor).populate(populatePost)
    const users = await User.find(query, select, cursor).populate(populateUser)
    return res.status(200).json({ data: { blogs, posts, users } })
  } catch (error) {
    throw new Error(error)
  }
}

router.get('/', query(), index)


export default router