var db = global.db;

var models = require('../models/model');

var Task = models.Task;
var Project = models.Project;

exports.create = function (req, res)
{
	var body = req.body;
	var params = req.params;
	console.log("Creating task \"" + req.body.name + "\"...");

	var taskObj = {name: body.name};
	var task = new Task(taskObj);


	Project.findById(params.project_id, 'name tasks', function (err, project)
	{
		if (!err && project)
		{
			console.log("Creating task \"" + body.name + "\" for project \"" + project.name + "\"...");

			project.tasks.push(task);

			project.save(function (err2)
			{
				if (err2)
					res.send(500, err2); //server error
				else
					res.json(201, task);
			});ca
		}
		else
			res.send(500, err);
	});
}

exports.list = function (req, res)
{
	Project.findById(req.params.project_id, 'tasks', function (err, projects)
	{
		res.json(200, projects.tasks);
	});
}

exports.update = function (req, res)
{
	var params = req.params;
	var body = req.body;

	console.log("Updating task \"" + req.body.name + "\"...");

	Project.findById(params.project_id, function (err, project)
	{
		if (err || !project)
			res.send(500, err);
		else
		{
			var task = project.tasks.id(params.task_id);
			if (task)
			{
				task.name = body.name;

				project.save(function (err, project)
				{
					if (err || !project)
						res.send(500, err);
					else
					{
						res.json(200, task); // 200 OK
					}
				});

			}
			else
				res.send(404);
		}
	});


}

exports.delete = function (req, res)
{
	var body = req.body;
	var params = req.params;

	console.log("Deleting task with id \"" + req.params.task_id + "\"...");

	Project.findById(params.project_id, 'name tasks', function (err, project)
	{
		if (!err && project)
		{
			// TODO: Error handling (not found)
			project.tasks.pull(params.task_id);

			project.save(function (err2)
			{
				if (err2)
					res.send(500, err2); //server error
				else
					res.send(200);
			});
		}
		else
			res.send(500, err);
	});
}
