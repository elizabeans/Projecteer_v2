var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Notification = new Schema({

});

// When creating a new project, save the current date
Notification.pre('save', function (next) {

});

module.exports = mongoose.model('Notification', Notification);