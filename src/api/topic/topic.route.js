import { Router } from 'express'
import { middleware as query } from 'querymen'

import { index, show, create, update, destroy } from './topic.controller'
import { authenticate } from '../../middleware/authenticate'
const router = new Router()

router.get('/', query(), index)
router.get('/:id', show)
router.put('/:id', authenticate(['admin']), update)
router.post('/', authenticate(['admin']), create)
router.delete('/:id', authenticate(['admin']), destroy)

export default router
