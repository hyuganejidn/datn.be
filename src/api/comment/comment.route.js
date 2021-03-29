import { Router } from 'express'

import { index, vote, create, destroy, deleteMany, getById, like, update } from './comment.controller'
import { authenticate } from '../../middleware/authenticate'

const router = new Router()

router.get('/', index)
router.get('/:id', getById)
router.post('/', authenticate(), create)

router.put('/:id/vote', authenticate(), vote)
router.put('/:id/like', authenticate(), like)
router.put('/:id', authenticate(), update)

router.delete('/:id', authenticate(), destroy)
router.delete('/', authenticate(['admin']), deleteMany)

export default router
