import { Router } from 'express'
import { middleware as query } from 'querymen'

import { index, show, create, update, destroy } from './blog.controller'
import { authenticate } from '../../middleware/authenticate'
const router = new Router()

router.get('/', query(), index)
router.get('/:id', show)
router.put('/:id', authenticate(), update)
router.post('/', authenticate(), create)
router.delete('/:id', authenticate(), destroy)

export default router
