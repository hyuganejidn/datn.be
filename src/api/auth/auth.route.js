import { Router } from 'express'

import { login, register } from './auth.controller'
const router = new Router()

router.post('/login', login);
router.post('/register', register)

export default router