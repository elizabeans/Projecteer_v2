'use strict';

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {

	//if (req.isAuthenticated()) { return next(); }
	if(req.session.passport.user) {
		return next();
	} else {
		res.send(401)
	};
}
