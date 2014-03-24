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
performSchema.set('toJSON', { getters: true, virtuals: true });
performSchema.set('toObject', { getters: true, virtuals: true });

performSchema.virtual('totalHours')
	.get(function ()
	{
		return (this.endDate - this.startDate) - this.pauseTime;
	});

var taskSchema = new mongoose.Schema({
	name: String,
	performs: [performSchema]
});
taskSchema.set('toJSON', { getters: true, virtuals: true });
taskSchema.set('toObject', { getters: true, virtuals: true });

taskSchema.virtual('totalHours')
	.get(function ()
	{
		var totalHours = 0;

		Task.findOne({_id: this.id}, 'performs', function (err, task)
		{
			if (!err && task)
			{
				task.performs.forEach(function (perform, index, array)
				{
					totalHours += perform.totalHours;
				});
			}
		});

		return totalHours;
	});

var projectSchema = new mongoose.Schema({
	name: String,
	tasks: [taskSchema]
});

projectSchema.set('toJSON', { getters: true, virtuals: true });
projectSchema.set('toObject', { getters: true, virtuals: true });

projectSchema.virtual('totalHours')
	.get(function ()
	{
		var totalHours = 0;
		Project.findOne({_id: this.id}, 'tasks', function (err, project)
		{
			if (!err && project)
			{
				project.tasks.forEach(function (task, index, array)
				{
					totalHours += task.totalHours;
				});
			}
		});


		return totalHours;
	});

exports.PerformSchema = performSchema;
exports.ProjectSchema = projectSchema;
exports.TaskSchema = taskSchema;

var Project = db.model('projects', projectSchema);
var Perform = db.model('performs', performSchema);
var Task = db.model('tasks', taskSchema);

exports.Project = Project;
exports.Perform = Perform
exports.Task = Task;