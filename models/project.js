var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Project = new Schema({
    name: String,
    description: String,
    createdDate: Date,
    createdBy: String, 
    tags: [String]
});

// When creating a new project, save the current date
Project.pre('save', function (next) {
    var now = new Date();
    
    this.createdDate = now;
    next();
});


module.exports = mongoose.model('Project', Project);