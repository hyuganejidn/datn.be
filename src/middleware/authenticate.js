import passportJwt from "../configs/passport";
// import { passport as passportJwt } from '../configs'
// import User from '../api/user/user.model'

export const authenticate = (roles = ['user', 'admin']) => (req, res, next) =>
	passportJwt.authenticate('jwt', { session: false }, (err, user, info) => {
		// console.log(req, user, '@debug')
		if (err) return res.status(401).end();
		if (!user) throw Error('Invalid token, please log in or sign up');
		if (!roles.includes(user.role)) return res.status(401).end();

		req.user = user;
		return next();
	})(req, res, next);
