var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    first_name: String,
    last_name: String,
    username: { type: String, unique: true, required: true },
    email: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);