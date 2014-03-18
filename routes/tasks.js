//routes/tasks.js

var Task = require('../models/task');

module.exports.create = function (req, res)
{

}

module.exports.list = function (req, res)
{
	var data = [
		{"name":"Vakken vullen", "totalhours":"04:45"},
		{"name":"Kassa","totalhours":"01:30"},
		{"name":"Dwijlen","totalhours":"00:30"},
		{"name":"Slager helpen","totalhours":"02:0"}
	];
	res.send(data);

}

module.exports.delete = function (req, res)
{

}
