var express = require('express');
var async = require('async');
var auth = require('./helper/auth');
var Project = require('../models/project');
var router = express.Router();

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

router.post('/', filterTags, function (req, res) {

	var newProject = new Project(req.body);

	newProject.save(function(err) {
		if(err) {
			res.status(500).send(err)
		};

		console.log("Project created successfully");
		res.status(200).send({});
	});
});

module.exports = router;