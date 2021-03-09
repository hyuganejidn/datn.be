import { Router } from 'express'
import { middleware as query } from 'querymen'

import { index, show, create, update, destroy, votePost, likePost, listComment, findPostsFollowed } from './post.controller'
import { authenticate } from '../../middleware/authenticate'
const router = new Router()

router.get('/', query({ classify: { paths: ['classify'] } }), index)
router.get('/blogs_followed', authenticate(), query(), findPostsFollowed)
router.get('/:id', show)
router.get('/:id/comments', listComment)

router.put('/:id', authenticate(['admin']), update)
router.put('/:id/vote', authenticate(), votePost)
router.put('/:id/like', authenticate(), likePost)

router.post('/', authenticate(), create)
router.delete('/:id', authenticate(['admin']), destroy)


export default router
