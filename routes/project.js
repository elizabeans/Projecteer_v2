var express = require('express');
var async = require('async');
var auth = require('./helper/auth');
var Project = require('../models/project');
var router = express.Router();
var Pusher = require('pusher');

var pusher = new Pusher({
	appId: '193983',
	key: '24242171b74120385a82',
	secret: 'e32af622090fbcfa3258',
	encrypted: true
});

var filterTags = function(req, res, next) {

	var tags = [];

	async.each(req.body.tags, function(item, callback) {
		tags.push(item.text);
		callback();	
	}, function() {

		req.body.tags = tags;
		next();
	});
};

router.get('/detail/:id', function(req, res) {

	Project.findOne({ _id: req.params.id }, function(err, project) {

		if(err) {
			res.status(404).send({
				message: "No project with id " + req.params._id + " found."
			});
		}

		res.status(200).send(project);
	});

});

router.get('/all', function (req, res) {

	Project.find({}, function(err, projects) {
		res.status(200).send(projects);
	});

});

router.get('/all/:userId', function (req, res) {

	Project.find({ createdBy: userId }, function(err, projects) {

		if(err) {
			res.status(200).send({
				err: "None found"
			});
		}

		res.status(200).send(projects);
	});

});


router.post('/', filterTags, function (req, res) {

	var newProject = new Project(req.body);

	newProject.save(function(err) {
		if(err) {
			res.status(500).send(err)
		};

		// tell Pusher to trigger an 'updated' event on the 'items' channel
		// add pass the changed item to the event
		pusher.trigger('projects', 'updated', newProject);

		console.log("Project created successfully");
		console.log(newProject);
		res.status(200).send(newProject);
	});
});

router.delete('/:id', function(req, res) {

	Project.findOne({ "_id": req.params.id }).remove().exec( function(err) {
		if(err) {
			console.log(err);
		}

		res.status(200).send();
	});
});

module.exports = router;