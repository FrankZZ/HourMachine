// models/task.js

var mongoose = new require('mongoose');

module.exports = mongoose.model('Task',
	{
		name: String,
		done: Boolean
	});
