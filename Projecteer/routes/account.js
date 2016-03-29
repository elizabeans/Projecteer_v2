var express = require('express');
var Account = require('../models/account');
var router = express.Router();
var jwt = require("jsonwebtoken");


router.post('/login', function (req, res) {
    // find the user
    Account.findOne({
        username: req.body.username
    }, function (err, user) {
        
        if (err) throw err;
        
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            
            // check if password matches
            if (user.password !== req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'User authenticated!',
                    token: token,
                    user: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        username: user.username,
                        email: user.email   
                    }
                });
            }
        }
    });
});

router.post('/register', function (req, res) {

    console.log(req.body);

    // create a sample user
    var newAccount = new Account(req.body);
    
    // save the sample user
    newAccount.save(function (err) {
        if (err) throw err;
        
        console.log('User saved successfully');
        res.status(200).json({ success: true });
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).send({});
});

module.exports = router;