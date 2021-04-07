import { Router } from 'express'
import { middleware as query } from 'querymen'

import { authenticate } from '../../middleware/authenticate'
import { index, destroy, destroyMany, show } from './report.controller'
const router = new Router()

router.get('/', authenticate(['admin']), query(), index)
router.get('/:id', authenticate(['admin']), show)
router.delete('/:id', authenticate(['admin']), destroy)
router.delete('/', authenticate(['admin']), destroyMany)

export default router
