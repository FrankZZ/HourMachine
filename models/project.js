// models/project.js

var mongoose = new require('mongoose');

module.exports = mongoose.model('Project',
	{
		name: String,
		done: Boolean
	});
