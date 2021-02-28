import { Router } from 'express'
import { middleware as query } from 'querymen'

import { index, show, create, update, destroy, votePost, likePost } from './post.controller'
import { authenticate } from '../../middleware/authenticate'
const router = new Router()

router.get('/', query({ classify: { paths: ['classify']} }), index)
router.get('/:id', show)
router.put('/:id', authenticate(['admin']), update)
router.post('/', authenticate(['admin']), create)
router.delete('/:id', authenticate(['admin']), destroy)

router.post('/:id/vote', authenticate(), votePost)
router.post('/:id/like', authenticate(), likePost)

export default router
