var express = require('express');
var Account = require('../models/account');
var router = express.Router();
var jwt = require("jsonwebtoken");

router.get('/', function (req, res) {
    res.status(200).send({});
});

module.exports = router;