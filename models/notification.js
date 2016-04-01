var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Notification = new Schema({
	fromUsername: String,
	toUsername: String,
	projectName: String,
	message: String,
	createdDate: Date
});

// When creating a new project, save the current date
Notification.pre('save', function (next) {
    var now = new Date();
    
    this.createdDate = now;
    next();
});

module.exports = mongoose.model('Notification', Notification);