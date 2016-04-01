var express = require('express');
var passport = require('passport');
var auth = require('./helper/auth');
var Account = require('../models/account');
var Tag = require('../models/tags');
var router = express.Router();
var app = express();


router.get('/', function (req, res) {
    res.status(200).send({});
});

router.get('/tags', function(req, res) {

	Tag.find({}, function(tags) {
		res.status(200).send(tags);
	});
});

router.put('/tags', function(req, res) {

	/*Tag.find({}, function(tags) {

		tags.push
		var uniqueTags = 
	});*/
});

// test route for seeing if authentication is working....
router.get('/app/authenticated', auth.ensureAuthenticated, function (req, res) {
    console.log("user is authenticated");
    res.status(200).send({});
});

module.exports = router;