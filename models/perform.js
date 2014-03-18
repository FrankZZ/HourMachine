// models/perform.js

var mongoose = new require('mongoose');

var PerformSchema = new mongoose.Schema(
	{
		name: String,
		done: Boolean
	}
);

module.exports = mongoose.model('Perform', PerformSchema);
