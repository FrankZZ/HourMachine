// models/project.js
/*
module.exports = mongoose.model('Project',
	{
		name: String,
		done: Boolean
	});
*/
var mongoose = require('mongoose');

var performSchema = new mongoose.Schema({
	date: Date,
	fromTime: Date,
	toTime: Date,
	pauseTime: Date,
	comment: String
});
performSchema.virtual('totalHours')
	.get(function ()
	{
		return (this.toTime - this.fromTime) - this.pauseTime;
	});

var taskSchema = new mongoose.Schema({
	name: String,
	totalHours: String,
	performs: [performSchema]
});

exports.ProjectSchema = new mongoose.Schema({
	name: String,
	tasks: [taskSchema]
});
