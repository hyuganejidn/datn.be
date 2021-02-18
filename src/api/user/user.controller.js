
import User from './user.model'
import { error, notFound, success } from '../../helpers/api'
import { verifyResetPassword } from './user.service'

export const index = async ({ querymen: { query, select, cursor } }, res) => {
  User.find(query, select, cursor)
    .then(async users => {
      const total = await User.countDocuments(query).exec()
      return { data: users, total }
    })
    .then(success(res))
    .catch(error(res))
}


export const showInfo = async ({ params, }, res) =>
  await User.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(error(res))

export const showMe = async ({ user }, res) => res.json(user)

export const updateMe = async ({ params },) => {

}

export const updateInfo = async ({ params, body, user }, res) => {
  // const { id } = params
  // const { fullName, avatarUrl } = body
  // User.findByIdAndUpdate(id, { fullName, avatarUrl }, { new: true, useFindAndModify: false })
  //   .then(user => res.status(200).json(user))
  //   .catch(err => res.status(404).json(err))
}

export const resetPassword = async ({ params, body, user }, res) => {
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => verifyResetPassword(body, result, user))
    .then(({ user, new_password }) => user.set({ password: new_password }).save())
    .then(success(res))
    .catch(error(res))
}
