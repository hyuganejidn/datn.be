import { User } from '../user/user.model'

import { error, success } from '../../helpers/api'
import { verifyBeforeCreating, verifyUserLogin } from './auth.service'

const register = ({ body }, res) =>
  verifyBeforeCreating(body)
    .then(async data => await User.create(data))
    .then(success(res, 201))
    .catch(error(res))

const login = ({ body }, res) =>
  verifyUserLogin(body)
    .then(success(res, 201))
    .catch(error(res))


export { register, login }
