import { config } from 'dotenv'
config()
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import { User } from '../api/user/user.model'

const { JWT_SECRET } = process.env

const opts = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('token'),
    ExtractJwt.fromBodyField('token'),
    ExtractJwt.fromAuthHeaderAsBearerToken()
  ]),
}

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    // console.log(jwtPayload, 'jwtPayload')
    User.findById(jwtPayload.id)
      .then(user => {
        if (user) {
          delete user.password
          done(null, user)
        } else return done(null, false);
      })
      .catch((err) => done(err, false))
  })
)

export default passport