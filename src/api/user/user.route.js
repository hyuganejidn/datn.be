import { Router } from 'express'
import { middleware as query } from 'querymen'

import {
  index, showMe, updateMe, showInfo, updateInfo, updateUserInfo, followBlog, findPostsVoted, resetPassword, findCommentsVoted, findBlogs, findPostsForum, updateAvatar
} from './user.controller'
import { authenticate } from '../../middleware/authenticate'
const router = new Router()

router.get('/', authenticate(['admin']), query(), index)
router.get('/me', authenticate(), showMe)
router.get('/posts_vote', authenticate(), findPostsVoted)
router.get('/comments_vote', authenticate(), findCommentsVoted)
router.get('/me/blogs', authenticate(), query(), findBlogs)
router.get('/:id/blogs', query(), findBlogs)

router.get('/:id/posts', query(), findPostsForum)
router.get('/:id', showInfo)

router.post('/follow_blog', authenticate(), followBlog)

router.put('/me', authenticate(), updateMe)
router.put('/avatar', authenticate(), updateAvatar)
router.put('/info', authenticate(), updateInfo)

router.put('/:id', authenticate(['admin']), updateUserInfo)
router.put('/:id/reset_password', authenticate(), resetPassword)




export default router
