//routes/performs.js

var Perform = require('../models/perform');

module.exports.create = function (req, res)
{

}

module.exports.list = function (req, res)
{
	var data = [
		{"date":"do 24-02-2014","name":"Vakken vullen", "totalhours":"01:30"},
		{"date":"vr 25-02-2014","name":"Vakken vullen","totalhours":"01:30"},
		{"date":"vr 25-02-2014","name":"Slager helpen","totalhours":"02:00"},
		{"date":"do 24-02-2014","name":"Vakken vullen","totalhours":"01:45"}
	];
	res.send(data);

}

module.exports.delete = function (req, res)
{

}
