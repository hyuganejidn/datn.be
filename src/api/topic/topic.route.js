import { Router } from 'express'
import { middleware as query } from 'querymen'

import { index, show, create, update, destroy, findPosts, createMany, destroyMany } from './topic.controller'
import { authenticate } from '../../middleware/authenticate'
const router = new Router()

router.get('/', query(), index)
router.get('/:id', show)
router.put('/:id', authenticate(['admin']), update)
router.post('/', authenticate(['admin']), create)
router.post('/many', authenticate(['admin']), createMany)
router.delete('/many', authenticate(['admin']), destroyMany)
router.delete('/:id', authenticate(['admin']), destroy)

router.get('/:slug/posts', query(), findPosts)

export default router
