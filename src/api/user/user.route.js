import { Router } from 'express'
import { middleware as query } from 'querymen'

import {
  index, showMe, updateMe, showInfo, updateInfo, followBlog, findPostsVoted, resetPassword, findCommentsVoted, findBlogs, findPostsForum
} from './user.controller'
import { authenticate } from '../../middleware/authenticate'
const router = new Router()

router.get('/', authenticate(['admin']), query(), index)
router.get('/me', authenticate(), showMe)
router.get('/posts_vote', authenticate(), findPostsVoted)
router.get('/comments_vote', authenticate(), findCommentsVoted)
router.get('/:id/blogs', authenticate(), query(), findBlogs)
router.get('/:id/posts', query(), findPostsForum)
router.get('/:id', authenticate(), showInfo)

router.post('/follow_blog', authenticate(), followBlog)

router.put('/me', authenticate(), updateMe)
router.put('/:id', authenticate(['admin']), updateInfo)
router.put('/:id/reset_password', authenticate(), resetPassword)




export default router
