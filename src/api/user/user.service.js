import validator from 'validator'
import bcryptjs from 'bcryptjs'

import { MIN_PASSWORD, MAX_PASSWORD } from '../../constants'
import { hashPassword } from '../auth/auth.service'

export const verifyResetPassword = async (payload, data, user) => {
  const { new_password, new_password_confirm, password } = payload

  const isSelfUpdate = user.role === 'user' && user.id !== data.id
  if (isSelfUpdate) throw {
    valid: false,
    param: 'password',
    message: 'You can\'t change other user\'s password'
  }

  const isPasswordCorrect = await bcryptjs.compare(password, data.password)
  if (!isPasswordCorrect) throw { password: 'Password is incorrect.' }

  const errors = verifyNewPassword(password, new_password, new_password_confirm)
  if (Object.keys(errors).length) throw errors

  const securePassword = await hashPassword(new_password)
  return {
    user: data,
    new_password: securePassword
  }
}

export const verifyNewPassword = (password, new_password, new_password_confirm) => {
  const errors = {}
  if (!new_password) {
    errors.new_password = 'New password field is required.'
  }
  else {
    if (new_password === password) {
      errors.new_password = 'New password is the same as current password.'
    }
    const isEnoughLength = validator.isLength(new_password, {
      min: MIN_PASSWORD,
      max: MAX_PASSWORD,
    })
    if (!isEnoughLength) {
      errors.new_password = `Password need at least ${MIN_PASSWORD} character and less than ${MAX_PASSWORD} character`
    }
  }
  if (!new_password_confirm || !validator.equals(new_password_confirm, new_password)) {
    errors.new_password_confirm = 'New password confirm is not match.'
  }

  return errors
}