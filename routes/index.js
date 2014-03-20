var mongoose = require('mongoose');

var db = mongoose.createConnection(require('../config/database').url);

var ProjectSchema = require('../models/Project').ProjectSchema;
var Project = db.model('projects', ProjectSchema);

exports.list = function (req, res)
{
	Project.find()
		.exec(function (err, projects)
	{
		res.json(projects);
	});
}

exports.createproject = function (req, res)
{
	var body = req.body;
	var projectObj = {name: body.name};
	var project = new Project(projectObj);

	project.save(function (err, project)
	{
		if (err || !project)
			res.send(500, err);
		else
		{
			Project.find()
				.exec(function (err2, projects)
				{
					if (err2 || !projects)
						res.send(500, err2);
					else
						res.json(projects);
				});
		}
	});
}
