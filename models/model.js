// models/project.js
/*
module.exports = mongoose.model('Project',
	{
		name: String,
		done: Boolean
	});
*/
var mongoose = require('mongoose');
var db = global.db;

var performSchema = new mongoose.Schema({
	startDate: Number,	// seconds since 1/1/1970
	endDate: Number,	// seconds since 1/1/1970
	pauseTime: Number,	// seconds
	comment: String
});
performSchema.virtual('totalHours')
	.get(function ()
	{
		return (this.endDate - this.startDate) - this.pauseTime;
	});

var taskSchema = new mongoose.Schema({
	name: String,
	performs: [performSchema]
});

taskSchema.virtual('totalHours')
	.get(function ()
	{
		var totalHours = 0;

		this.performs.forEach(function (perform, index, array)
		{
			totalHours += perform.totalHours;
		});

		return totalHours;
	});

var projectSchema = new mongoose.Schema({
	name: String,
	tasks: [taskSchema]
});

projectSchema.virtual('totalHours')
	.get(function ()
	{
		var totalHours = 0;

		this.tasks.forEach(function (task, index, array)
		{
			totalHours += task.totalHours;
		});

		return totalHours;
	});

exports.PerformSchema = performSchema;
exports.ProjectSchema = projectSchema;
exports.TaskSchema = taskSchema;

exports.Project = db.model('projects', projectSchema);
exports.Perform = db.model('performs', performSchema);
exports.Task = db.model('tasks', taskSchema);