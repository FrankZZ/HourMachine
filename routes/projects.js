var db = global.db;
var ProjectSchema = require('../models/model').ProjectSchema;
var Project = db.model('projects', ProjectSchema);

exports.create = function (req, res)
{
	var body = req.body;

	console.log("Creating project \"" + req.body.name + "\"...");

	var projectObj = {name: body.name};
	var project = new Project(projectObj);

	project.save(function (err, project)
	{
		if (err || !project)
			res.send(500, err);
		else
		{
			res.json(201, project); // 201 Created
		}
	});
}

exports.list = function (req, res)
{
	Project.find({}, 'name tasks totalHours')
		.exec(function (err, projects)
		{
			res.json(200, projects);
		});
}

exports.update = function (req, res)
{
	var params = req.params;
	var body = req.body;

	console.log("Updating project \"" + req.body.name + "\"...");

	Project.findById(params.project_id, function (err, project)
	{
		project.name = body.name;

		project.save(function (err, project)
		{
			if (err || !project)
				res.send(500, err);
			else
			{
				res.json(200, project); // 200 OK
			}
		});
	});


}

exports.delete = function (req, res)
{
	console.log("Deleting project with id \"" + req.params.project_id + "\"...");

	Project.findByIdAndRemove(req.params.project_id, function (err, project)
	{
		if (err)
		{
			res.send(500, err); //internal server error
		}
		else if (!project)
		{
			res.send(404); // not found
		}
		else
		{
			console.log("Deleted project \"" + project.name + "\"...");
			res.send(200); //OK
		}
	})
}