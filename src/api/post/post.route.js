import { Router } from 'express'
import { middleware as query } from 'querymen'

import { index, show, create, update, destroy, votePost, deleteMany, likePost, listComment, findPostsFollowed } from './post.controller'
import { authenticate } from '../../middleware/authenticate'
const router = new Router()

router.get('/', query({
  classify: {
    paths: ['classify'],
  },
  isBlock: {
    paths: ['isBlock']
  }
}), index)
router.get('/blogs_followed', authenticate(), query(), findPostsFollowed)
router.get('/:id', show)
router.get('/:id/comments', listComment)

router.put('/:id', authenticate(), update)
router.put('/:id/vote', authenticate(), votePost)
router.put('/:id/like', authenticate(), likePost)

router.post('/', authenticate(), create)

router.delete('/:id', authenticate(), destroy)
router.delete('/', authenticate(['admin']), deleteMany)

export default router
