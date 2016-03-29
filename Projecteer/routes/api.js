var express = require('express');
var Account = require('../models/account');
var Project = require('../models/project');
var router = express.Router();
var jwt = require("jsonwebtoken");

// route middleware to verify a token
router.use(function (req, res, next) {
    
    // check header or url parameters or post parameters for token
    // x-access-token
    var token = req.body.token || req.query.token || req.headers['authorization'];
    
    // decode token
    if (token) {
        
        // verifies secret and checks exp
        jwt.verify(token, app.get(process.env.SECRET), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false, 
            message: 'No token provided.'
        });
    
    }
});

router.get('/user', function (req, res) {

    console.log(req.query);

    Account.findOne({
        username: 'kanehchong'
    }, function (err, user) {
        
        if (err) throw err;
        
        if (!user) {
            res.status(401).json({ success: false, message: 'No User' });
        } else if (user) {

            res.status(200).json({
                data: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    email: user.email
                }
            });
        }
    });
});

router.get('/projects', function(req, res) {

    Project.find({}, function(err, projects) {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).send(projects);
    });

});

router.post('/projects', function (req, res) {

    var newProject = new Project(req.body);

    newProject.save(function(err) {
        if (err) {
            res.status(500).send(err);
        }

        console.log('Project created successfully');
        res.status(200).send({ success: true });
    });

    // save the sample user
    newAccount.save(function (err) {
        if (err) throw err;
        
        console.log('User saved successfully');
        res.status(200).json({ success: true });
    });
});

module.exports = router;