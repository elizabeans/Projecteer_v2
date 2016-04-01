var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    first_name: String,
    last_name: String,
    username: { type: String, unique: true, required: true },
    email: String,
    description: String
});

Account.plugin(passportLocalMongoose);

// When creating a new project, save the current date
Account.pre('save', function (next) {
    this.description = "No description available."

    next();
});

module.exports = mongoose.model('Account', Account);