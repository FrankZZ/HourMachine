var db = global.db;

var models = require('../models/model');

var Task = models.Task;
var Project = models.Project;


exports.create = function (req, res)
{
	var body = req.body;

	if ("name" in req.body)
	{
		Project.findById(req.params.project_id, function (err, project)
		{
			if (err || !project)
			{
				res.send(404, err); //not found
				return;
			}

			console.log("Creating task \"" + req.body.name + "\" for project \"" + project.name + "\"...");

			project.tasks.push({name: body.name});

			project.save(function (err)
			{
				if (err)
				{
					res.send(500, err); //server error
					return;
				}

				res.send(200, project.tasks);
			});

		});
	}
	else
	{
		res.send(400); // invalid request
	}

}

exports.list = function (req, res)
{
	Project.findById(req.params.project_id, function (err, project)
	{
		if (err || !project)
		{
			res.send(404, err); //not found
			return;
		}

		console.log("Listing tasks of project \"" + project.name + "\"...");

		res.send(200, project.tasks);

	});
}

exports.update = function (req, res)
{

}

exports.delete = function (req, res)
{
	Project.findById(req.params.project_id, function (err, project)
	{
		if (err || !project)
		{
			res.send(404, err); //not found
			return;
		}

		console.log("Deleting task \"" + req.body.name + "\" of project \"" + project.name + "\"...");

		var task = project.tasks.id(req.params.task_id);

		if (task)
		{
			task.remove();

			project.save(function (err)
			{
				if (err)
				{
					res.send(500, err); //server error
					return;
				}

				res.send(200, project);
			});
		}
		else
		{
			res.send(404, 'Cannot find task with ObjectId ' + req.params.task_id);
		}
	});
}