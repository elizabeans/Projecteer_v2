'use strict';

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  
	//if (req.isAuthenticated()) { return next(); }
	console.log(req.session.passport.user);
	if(req.session.passport.user) { 
		return next(); 
	} else {
		res.send(401)
	};
}
