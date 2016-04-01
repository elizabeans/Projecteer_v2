var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/isAuthenticated', function(req, res) {

    console.log(req.session)
    if(req.session.passport) {
        res.status(200).send();
    } else {
        res.status(401).send();
    };

});

router.post('/register', function (req, res) {
    Account.register(new Account(req.body), req.body.password, function (err, account) {
        if (err) {
            return res.status(500).send(err);
        }

        passport.authenticate('local')(req, res, function () {
            res.status(200).send({
                data : {
                    first_name: req.user.first_name,
                    last_name: req.user.last_name,
                    email: req.user.email,
                    username: req.user.username,
                    expires: req.session.cookie._expires
                }
            });
        });
    });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    console.log("User Logged in!");
    console.log(req.user);

    res.status(200).send({
        data : {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            username: req.user.username,
            expires: req.session.cookie._expires
        }
    });
});

router.get('/logout', function (req, res) {

    req.logout();
    req.session.destroy(function(err) {
        res.status(200).send({});
    });
});

module.exports = router;