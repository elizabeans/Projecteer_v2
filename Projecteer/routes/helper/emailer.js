'use strict';

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.emailer = function sendEmail(req, res) {

	app.mailer.send('email', {
	    to: to, // REQUIRED. This can be a comma delimited string just like a normal email to field.  
	    subject: 'Test Email', // REQUIRED.
	    message: 'This is a test email' // All additional properties are also passed to the template as local variables. 
	  }, function (err) {
	    if (err) {
	      // handle error 
	      console.log(err);
	      res.send('There was an error sending the email');
	      return;
	    }
	    res.send('Email Sent');
	  });
}
