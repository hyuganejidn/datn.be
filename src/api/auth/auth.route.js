import { Router } from 'express'

import { login, register, refreshToken } from './auth.controller'
const router = new Router()

router.post('/login', login);
router.post('/register', register)
router.post('/refresh_token', refreshToken)

export default router