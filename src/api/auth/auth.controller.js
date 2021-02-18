import User from '../user/user.model'

import { error, success } from '../../helpers/api'
import { verifyBeforeCreating, verifyUserLogin } from './auth.service'

const register = async ({ body }, res) =>
  verifyBeforeCreating(body)
    .then(data => User.create(data))
    .then(success(res, 201))
    .catch(error(res))

const login = async ({ body }, res) =>
  verifyUserLogin(body)
    .then(success(res, 201))
    .catch(error(res))


export { register, login }
