import { Router } from 'express'
import { middleware as query } from 'querymen'

import { index, show, create, update, destroy, findPost, createMany } from './topic.controller'
import { authenticate } from '../../middleware/authenticate'
const router = new Router()

router.get('/', query(), index)
router.get('/:id', show)
router.put('/:id', authenticate(['admin']), update)
router.post('/', authenticate(['admin']), create)
router.post('/many', authenticate(['admin']), createMany)
router.delete('/:id', authenticate(['admin']), destroy)

router.get('/:id/posts', query(), findPost)

export default router
