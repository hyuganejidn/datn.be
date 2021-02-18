import { Router } from 'express'
import { middleware as query } from 'querymen'

import { index, showMe, updateMe, showInfo, updateInfo, resetPassword } from './user.controller'
import { authenticate } from '../../middleware/authenticate'
const router = new Router()

router.get('/', authenticate(['admin']), query(), index)
router.get('/me', authenticate(), showMe)
router.put('/me', authenticate(), updateMe)

router.get('/:id', authenticate(['admin']), showInfo)
router.put('/:id', authenticate(['admin']), updateInfo)

router.put('/:id/reset_password', authenticate(), resetPassword)

export default router
