var db = global.db;
var PerformSchema = require('../models/model').PerformSchema;
var Perform = db.model('performs', PerformSchema);

exports.create = function (req, res)
{
	var body = req.body;

	console.log("Creating perform \"" + body.name + "\"...");
    //var performObj = data = {"startDate" : "7113600000","endDate" : "7113800000","pauseTime" : "7083000000","comment": "blablasdbPIET"}
    // of
    //var performObj = {"startDate" : body.startDate,"endDate" : body.endDate,"pauseTime" : body.pauseTime,"comment": body.comment}
	var performObj = body.name;
	var perform = new Perform(performObj);

	perform.save(function (err, perform)
	{
		if (err || !perform)
			res.send(500, err);
		else
		{
			Perform.find()
				.exec(function (err2, performs)
				{
					if (err2 || !performs)
						res.send(500, err2);
					else
						res.json(performs);
				});
		}
	});
}

exports.list = function (req, res)
{
	Perform.find()
		.exec(function (err, performs)
		{
			res.json(performs);
		});
}

exports.update = function (req, res)
{

}

exports.delete = function (req, res)
{

}