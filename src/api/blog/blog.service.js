import { User } from '../user/user.model'
import Blog from './blog.model'

export const getUsersFollowedBlog = async (blogId) => {
  try {
    const users = await User.find({ blogsFollowing: { $elemMatch: { $eq: blogId } } })
    return { data: users }
  } catch (error) {
    throw { errors: error }
  }
}

export const verifyBeforeCreate = async (body, author) => {
  try {
    const errors = {}
    const { slug, title, destination, avatar } = body
    if (!title) errors.title = 'Field is required'
    if (!destination) errors.destination = 'Field is required'
    if (!avatar) errors.avatar = 'Field is required'
    if (!slug) errors.slug = 'Field is required'

    const blog = await Blog.findOne({ slug: slug })
    if (blog) errors.slug = 'Slug was exits'

    if(Object.keys(errors).length) throw errors
    return { ...body, author }
  } catch (errors) {
    throw { errors }
  }
}