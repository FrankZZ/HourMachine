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
performSchema.set('toJSON', { getters: true, virtuals: true, transform: function(doc, ret, options) { delete ret.tasks; delete ret._id; delete ret.__v; return ret; } });
performSchema.set('toObject', { getters: true, virtuals: true });

performSchema.virtual('totalTime')
	.get(function ()
	{
		return (this.endDate - this.startDate) - this.pauseTime;
	});
performSchema.virtual('dateString')
    .get(function ()
    {
        var startDate = new Date();
        startDate.setTime(this.startDate*1000);
        var dateString = ((startDate.getDate() < 10) ? "0"+startDate.getDate() : startDate.getDate())+"-"+((startDate.getMonth() < 10) ? "0"+(startDate.getMonth()+1) : (startDate.getMonth()+1))+"-"+startDate.getFullYear();
        return dateString;
    });
performSchema.virtual('totalTimeString')
    .get(function ()
    {
        var date = new Date("1/1/1970 ");
        date.setSeconds(this.totalTime);
        var totalTimeString =  date.toTimeString().replace(/.*(\d{2}:\d{2}):\d{2}.*/, "$1");
        return totalTimeString;
    });
var taskSchema = new mongoose.Schema({
	name: String,
	performs: [performSchema]
});
taskSchema.set('toJSON', { getters: true, virtuals: true, transform: function(doc, ret, options) { delete ret.performs; delete ret._id; delete ret.__v; return ret; } });
taskSchema.set('toObject', { getters: true, virtuals: true });

taskSchema.virtual('totalTime')
	.get(function ()
	{
		var totalTime = 0;

		this.performs.forEach(function (perform, index, array)
		{
			totalTime += perform.totalTime;
		});

		return totalTime;
	});
taskSchema.virtual('totalTimeString')
    .get(function ()
    {
        var date = new Date("1/1/1970 ");
        date.setSeconds(this.totalTime);
        var totalTimeString =  date.toTimeString().replace(/.*(\d{2}:\d{2}):\d{2}.*/, "$1");
        return totalTimeString;
    });
var projectSchema = new mongoose.Schema({
	name: String,
	tasks: [taskSchema]
});

projectSchema.set('toJSON', { getters: true, virtuals: true, transform: function(doc, ret, options) { delete ret.tasks; delete ret._id; delete ret.__v; return ret; } });
projectSchema.set('toObject', { getters: true, virtuals: true });

projectSchema.virtual('totalTime')
	.get(function ()
	{
		var totalTime = 0;
		this.tasks.forEach(function (task, index, array)
		{
			totalTime += task.totalTime;
		});

		return totalTime;
	});
projectSchema.virtual('totalTimeString')
    .get(function ()
    {
        var date = new Date("1/1/1970 ");
        date.setSeconds(this.totalTime);
        var totalTimeString =  date.toTimeString().replace(/.*(\d{2}:\d{2}):\d{2}.*/, "$1");
        return totalTimeString;
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