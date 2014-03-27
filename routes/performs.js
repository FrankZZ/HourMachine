var db = global.db;
var model = require('../models/model');

var Project = model.Project;
var Perform = model.Perform;

exports.create = function (req, res)
{
	var body = req.body;
	var params = req.params;

	//var performObj = data = {"startDate" : "7113600","endDate" : "7113800","pauseTime" : "7083000","comment": "blablasdbPIET"}
	// of
	//var performObj = {"startDate" : body.startDate,"endDate" : body.endDate,"pauseTime" : body.pauseTime,"comment": body.comment}

	var performObj = {startDate: body.startDate, endDate: body.endDate, pauseTime: body.pauseTime, comment: body.comment};
	var perform = new Perform(performObj);

	Project.findById(params.project_id, function (err, project)
	{
		var task = project.tasks.id(params.task_id);

		if (!err && task)
		{
			console.log("Creating perform for task \"" + task.name + "\"...");

			task.performs.push(perform);

			project.save(function (err2)
			{
				if (err2)
					res.send(500, err2); //server error
				else
					res.send(201, perform);
			});
		}
		else
			res.send(500);
	});

}

exports.list = function (req, res)
{
	var params = req.params;

	Project.findById(params.project_id, 'tasks', function (err, project)
	{
		var task = project.tasks.id(params.task_id);

		if (!err && task)
		{
			console.log("Listing performs for task \"" + task.name + "\"...");
			res.json(200, task.performs);
		}
		else
			res.send(500);

	});

}
exports.get = function (req, res)
{
    var params = req.params;


    Project.findById(params.project_id, function (err, project)
    {
        var task = project.tasks.id(params.task_id);

        if (!err && task)
        {

            var perform = task.performs.id(params.perform_id);

            res.send(200, perform);
        }
        else
            res.send(500);
    });
}
exports.update = function (req, res)
{
	var params = req.params;
	var body = req.body;

	Project.findById(params.project_id, function (err, project)
	{
		var task = project.tasks.id(params.task_id);

		if (!err && task)
		{
			console.log("Creating perform for task \"" + task.name + "\"...");

			var perform = task.performs.id(params.perform_id);

			perform.startDate = body.startDate;
			perform.endDate = body.endDate;
			perform.pauseTime = body.pauseTime;
			perform.comment = body.comment;

			project.save(function (err2)
			{
				if (err2)
					res.send(500, err2); //server error
				else
					res.send(200, perform);
			});
		}
		else
			res.send(500);
	});
}

exports.delete = function (req, res)
{
	var params = req.params;

	Project.findById(params.project_id, function (err, project)
	{
		var task = project.tasks.id(params.task_id);

		if (!err && task)
		{
			console.log("Deleting perform for task \"" + task.name + "\"...");

			task.performs.pull(params.perform_id);

			project.save(function (err2)
			{
				if (err2)
					res.send(500, err2); //server error
				else
					res.send(200);
			});
		}
		else
			res.send(500);
	});
}