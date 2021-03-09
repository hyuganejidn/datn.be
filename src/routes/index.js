import { Router } from 'express'

import authApi from '../api/auth/auth.route'
import userApi from '../api/user/user.route'
import topicApi from '../api/topic/topic.route'
import blogApi from '../api/blog/blog.route'
import postApi from '../api/post/post.route'
import commentApi from '../api/comment/comment.route'
import imageApi from '../api/image/image.route'

const router = new Router()

router.use('/auth', authApi)
router.use('/users', userApi)
router.use('/topics', topicApi)
router.use('/blogs', blogApi)
router.use('/posts', postApi)
router.use('/comments', commentApi)
router.use('/images', imageApi)

export default router

