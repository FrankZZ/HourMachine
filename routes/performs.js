//routes/performs.js

var Perform = require('../models/perform');
/*
 var dataTemplate = {
 date:datenowString,
 fromTime:"",
 toTime:"",
 pauseTime:"",
 totalHours:"",
 comment:"",
 task:""
 };
 */

var data = [
	{id: 0, date: "do 24-02-2014", fromTime: "07:00", toTime: "10:30", pauseTime: "00:15", comment: "", taskId: null, totalHours: "01:30"},
	{id: 1, date: "vr 25-02-2014", fromTime: "10:45", toTime: "11:00", pauseTime: "00:00", comment: "", taskId: null, totalHours: "01:30"},
	{id: 2, date: "vr 25-02-2014", fromTime: "13:00", toTime: "16:00", pauseTime: "00:45", comment: "", taskId: null, totalHours: "02:00"},
	{id: 3, date: "do 24-02-2014", fromTime: "19:00", toTime: "20:15", pauseTime: "00:10", comment: "", taskId: null, totalHours: "01:45"}
];
var highestId = data.length - 1;

module.exports.create = function (req, res)
{
	console.log("Creating perform #" + data.length + "...");
	if ("perform" in req.body)
	{
		highestId++;

		req.body.perform.id = highestId;
		data[highestId] = req.body.perform;

		res.send(200, data);
	}
	res.send(400, data); //bad request
}

module.exports.list = function (req, res)
{
	res.send(200, data);
}

module.exports.delete = function (req, res)
{
	var perform_id = req.params.perform_id;

	for( var i = 0; i < data.length; i++)
	{
		if (data[i] && data[i].id == perform_id)
		{
			console.log("Deleting perform #" + i + "...");
			data.splice(i, 1);
			res.send(200, data);
			return;
		}
	}
	res.send(404, data);
}

module.exports.update = function (req, res)
{
	var perform_id = req.params.perform_id;
	if ("perform" in req.body)
	{
		for( var i = 0; i < data.length; i++)
		{
			if (data[i] && data[i].id == perform_id)
			{
				console.log("Updating perform #" + i + "...");

				data[i] = req.body.perform;

				res.send(200, data);
				return;
			}
		}
		res.send(404, data);
	}
	else
		res.send(400, data); //bad request
}