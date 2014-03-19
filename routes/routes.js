// routes/routes.js

var projects = require('./projects');
var tasks = require('./tasks');
var performs = require('./performs');

module.exports = function (app)
{

	// *** Projects ***
	app.get('/api/projects', projects.list);

	app.put('/api/project/:project_id', projects.update);

	app.post('/api/projects', projects.create);

	app.del('/api/project/:project_id', projects.delete);


	// *** Tasks ***
	app.get('/api/tasks', tasks.list);

	// app.put('/api/task/:task_id', tasks.update);

	app.post('/api/tasks', tasks.create);

	app.del('/api/task/:task_id', tasks.delete);


	// *** Performs ***
	app.get('/api/performs', performs.list);

	// app.put('/api/perform/:perform_id', performs.update);

	app.post('/api/performs', performs.create);

	app.del('/api/perform/:perform_id', performs.delete);

};