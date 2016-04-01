var express = require('express');
var async = require('async');
var auth = require('./helper/auth');
var Notification = require('../models/notification');
var router = express.Router();
var Pusher = require('pusher');

var pusher = new Pusher({
	appId: '193983',
	key: '24242171b74120385a82',
	secret: 'e32af622090fbcfa3258',
	encrypted: true
});


router.get('/user/:username', function (req, res) {

	Notification.find({ toUsername: req.params.username }, function(err, notifications) {

		if(err) {
			res.status(200).send([]);
		}

		res.status(200).send(notifications);
	});

});


router.post('/', function (req, res) {

	var newNotification = new Notification(req.body);

	newNotification.save(function(err) {
		if(err) {
			res.status(500).send(err)
		};
		
		// tell Pusher to trigger an 'updated' event on the 'notification' channel
		// pass the added notification to the event
		pusher.trigger('notification', 'added', newNotification);
		//pusher.trigger('userProjects', 'added', newProject);

		res.status(200).send(newNotification);
	});
});


module.exports = router;