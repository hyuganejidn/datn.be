import validator from 'validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { MIN_PASSWORD, MAX_PASSWORD, TIME } from '../../constants'
import { User } from '../user/user.model'

const validateRegister = (data) => {
  const errors = {}
  const { fullName, username, password, passwordConfirm } = data;

  if (!fullName) errors.fullName = 'Full name field is required.'

  if (!username) errors.username = 'Username field is required.'

  if (!password) {
    errors.password = 'Password field is required.'
  }
  else {
    const isEnoughLength = validator.isLength(password, {
      min: MIN_PASSWORD,
      max: MAX_PASSWORD,
    })
    if (!isEnoughLength) {
      errors.password = `Password need at least ${MIN_PASSWORD} character and less than ${MAX_PASSWORD} character`
    }
  }

  if (!passwordConfirm || !validator.equals(password, passwordConfirm)) {
    errors.passwordConfirm = 'Confirm password is not match.'
  }
  return errors
}

const validationLogin = (data) => {
  const errors = {}
  const { username, password } = data

  if (!username) errors.username = 'Username field is required.'

  if (!password) errors.password = 'Password field is required.'

  return errors
}

const hashPassword = async (password) => {
  const saltRounds = 10
  try {
    const salt = await bcryptjs.genSalt(saltRounds)
    const hashed = await bcryptjs.hash(password, salt)
    return hashed
  } catch (err) {
    throw new Error(err)
  }
}

const generateToken = async ({ id, fullName, username }, expiresIn = TIME.WEEK * 52) => {
  try {
    const token = await jwt.sign({ id, fullName, username }, process.env.JWT_SECRET, { expiresIn, })
    return token
  } catch (error) {
    throw new Error(error)
  }
}

const generateRefreshToken = async ({ id, fullName, username }, expiresIn = TIME.WEEK * 52) => {
  try {
    const token = await jwt.sign({ id, fullName, username }, process.env.REFRESH_JWT_SECRET, { expiresIn, })
    return token
  } catch (error) {
    throw new Error(error)
  }
}

const verifyBeforeCreating = async (payload) => {
  const errors = validateRegister(payload)
  if (Object.keys(errors).length) throw { errors }

  const { username, password } = payload
  const user = await User.findOne({ username })
  if (user) throw { username: 'Username is already exists.' }

  const securePassword = await hashPassword(password)

  return { ...payload, password: securePassword }
}

const verifyUserLogin = async (payload) => {
  const errors = validationLogin(payload)
  if (Object.keys(errors).length) throw { errors }

  const { username, password } = payload
  const user = await User.findOne({ username })
  if (!user) throw { username: 'Username is incorrect.' }

  const isPasswordCorrect = await bcryptjs.compare(password, user.password)
  if (!isPasswordCorrect) throw { password: 'Password is incorrect.' }

  const token = await generateToken(user)
  const refreshToken = await generateRefreshToken(user)
  return { token, refreshToken }
}

const generateTokenNewToken = async (body) => {
  try {
    const data = jwt.verify(body.refreshToken, process.env.REFRESH_JWT_SECRET)
    // console.log(data)
    const user = await User.findById(data.id)
    if (user) {
      const token = await generateToken(user)
      return { token }
    }
  } catch (error) {
    throw new Error(error)
  }
}


export { validateRegister, hashPassword, validationLogin, generateToken, verifyBeforeCreating, verifyUserLogin, generateTokenNewToken }