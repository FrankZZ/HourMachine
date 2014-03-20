//routes/projects.js

var Project = require('../models/project');

var data = [
	{"id": 0, "name":"Werk jumbo", "totalHours":"00:30"},
	{"id": 1, "name":"School project php","totalHours":"01:30"},
	{"id": 2, "name":"School project java","totalHours":"50:00"},
	{"id": 3, "name":"Project motor fixen","totalHours":"05:45"}
];

module.exports.create = function (req, res)
{
	console.log("Creating project \"" + req.body.name + "\"...");
	var project = {"id": data.length, "name": req.body.name, "totalHours": req.body.totalHours};
	data[data.length] = project;

	res.send(200, data);
}

module.exports.list = function (req, res)
{
	res.send(200, data);
}

module.exports.delete = function (req, res)
{
	var project_id = req.params.project_id;

	for( var i = 0; i < data.length; i++)
	{
		if (data[i] && data[i].id == project_id)
		{
			console.log("Deleting project \"" + data[i].name + "\"...");
			data.splice(i, 1);
			res.send(200, data);
			return;
		}
	}
	res.send(404, 'NOT FOUND');
}

module.exports.update = function (req, res)
{
	var project_id = req.params.project_id;

	for( var i = 0; i < data.length; i++)
	{
		if (data[i] && data[i].id == project_id)
		{
			console.log("Updating project \"" + data[i].name + "\"...");

			data[i].name = req.body.name;
			data[i].totalHours = req.body.totalHours;

			res.send(200, data);
			return;
		}
	}
}