var express = require('express');
var passport = require('passport');
var auth = require('./helper/auth');
var Project = require('../models/project');
var router = express.Router();

router.get('/all', function (req, res) {

	console.log("IN PROJECTS");

	Project.find({}, function(err, projects) {
		res.status(200).send(projects);
	});

});

router.post('/', function (req, res) {

	console.log(req.body);
	
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