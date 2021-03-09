import { Router } from 'express'
import { middleware as query } from 'querymen'
import { upload } from '../../configs/multer'

import {
  create,
  // index, show, update, destroy, findPosts, createMany
} from './image.controller'
import { authenticate } from '../../middleware/authenticate'
const router = new Router()

router.post('/', authenticate(['admin']), upload.array('imgs'), create)


export default router
