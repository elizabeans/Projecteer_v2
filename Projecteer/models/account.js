var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('Account', Account);