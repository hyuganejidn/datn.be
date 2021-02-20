import { User } from '../user/user.model'

export const getUsersFollowedBlog = async (blogId) => {
  try {
    const users = await User.find({ blogsFollowing: { $elemMatch: { $eq: blogId } } })
    return { data: users }
  } catch (error) {
    throw { errors: error }
  }
}