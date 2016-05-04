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

router.get('/user/:username', function (req, res) {

	Project.find({ createdBy: req.params.username }, function(err, projects) {

		if(err) {
			res.status(200).send([]);
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

		// tell Pusher to trigger an 'added' event on the 'items' channel
		// add pass the changed item to the event
		pusher.trigger('projects', 'added', newProject);
		pusher.trigger('userProjects', 'added', newProject);

		res.status(200).send(newProject);
	});
});

router.delete('/user/:id', function(req, res) {

	console.log(req.params.id);

	Project.findOne({ _id: req.params.id }).remove(function(err, removed) {
		if(err) {
			res.status(500).send(err);
		}

		pusher.trigger('userProjects', 'deleted', { id: req.params.id } );

		res.status(200).send();
	});
});

module.exports = router;