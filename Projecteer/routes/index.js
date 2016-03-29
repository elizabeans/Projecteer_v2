var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();


router.get('/', function (req, res) {
    res.status(200).send({});
});

router.get('/app/dashboard', passport.authenticate('local'), function (req, res) {
    console.log("user is authenticated");
    res.status(200).send({});
});

router.post('/account/register', function (req, res) {
    Account.register(new Account(req.body), req.body.password, function (err, account) {
        console.log(account);

        if (err) {
            return res.status(500).send(err);
        }
        
        passport.authenticate('local')(req, res, function () {
            res.status(200).send({ user: req.user });
        });
    });
});

router.post('/account/login', passport.authenticate('local'), function (req, res) {
    console.log("User Logged in!");
    console.log(req.user);

    res.status(200).send({
        data : {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            username: req.user.username
        }
    });
});

router.get('/account/logout', function (req, res) {
    req.logout();
    res.status(200).send({});
});

module.exports = router;