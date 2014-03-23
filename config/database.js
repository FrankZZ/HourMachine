var mongoose = require('mongoose');

exports.initialize = function()
{
	global.db = mongoose.createConnection('mongodb://hourmachine:uurmachine@frankwammes.nl:27017/hourmachine');
}
