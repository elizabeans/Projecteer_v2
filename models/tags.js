var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tag = new Schema({
    tags: [String]
});

module.exports = mongoose.model('Tag', Tag);