import passportJwt from "../configs/passport";
// import { passport as passportJwt } from '../configs'
// import { User } from '../api/user/user.model'

export const authenticate = (roles = ['user', 'admin']) => (req, res, next) =>
  passportJwt.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return res.status(401).json(err)
    if (info) return res.status(401).json(info)
    if (!user) throw res.status(401).json(err)
    // console.log(user, info)
    if (!roles.includes(user.role)) return res.status(401).end()

    req.user = user
    return next();
  })(req, res, next);
