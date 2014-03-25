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
			Project.find()
				.exec(function (err2, projects)
				{
					if (err2 || !projects)
						res.send(500, err2);
					else
						res.send(201, project);
				});
		}
	});
}

exports.list = function (req, res)
{
	Project.find({}, 'name totalHours')
		.exec(function (err, projects)
		{
			res.json(projects);
		});
}

exports.update = function (req, res)
{

}

exports.delete = function (req, res)
{

}



////routes/projects.js
//
//var Project = require('../models/model');
//
//var data = [
//	{"id": 0, "name":"Werk jumbo", "totalHours":"00:30"},
//	{"id": 1, "name":"School project php","totalHours":"01:30"},
//	{"id": 2, "name":"School project java","totalHours":"50:00"},
//	{"id": 3, "name":"Project motor fixen","totalHours":"05:45"}
//];
//
//var highestId = data.length - 1;
//
//module.exports.create = function (req, res)
//{
//	if ("project" in req.body)
//	{
//		highestId++;
//		console.log("Creating project \"" + req.body.project.name + "\"...");
//		data[highestId] = req.body.project;
//
//		res.send(200, data);
//	}
//	else
//		res.send(400, data); //bad request
//}
//
//module.exports.list = function (req, res)
//{
//	res.send(200, data);
//}
//
//module.exports.delete = function (req, res)
//{
//	var project_id = req.params.project_id;
//
//	for( var i = 0; i < data.length; i++)
//	{
//		if (data[i] && data[i].id == project_id)
//		{
//			console.log("Deleting project \"" + data[i].name + "\"...");
//			data.splice(i, 1);
//			res.send(200, data);
//			return;
//		}
//	}
//	res.send(404, data);
//}
//
//module.exports.update = function (req, res)
//{
//	if ("project" in req.body)
//	{
//		var project_id = req.params.project_id;
//
//		for( var i = 0; i < data.length; i++)
//		{
//			if (data[i] && data[i].id == project_id)
//			{
//				console.log("Updating project \"" + data[i].name + "\"...");
//
//				data[i] = req.body.project;
//
//				res.send(200, data);
//				return;
//			}
//		}
//		res.send(404, data);
//	}
//	else
//		res.send(400, data);
//}