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

	app.delete('/api/project/:project_id', projects.delete);


	// *** Tasks ***
	app.get('/api/project/:project_id/tasks', tasks.list);

	app.put('/api/project/:project_id/task/:task_id', tasks.update);

	app.post('/api/project/:project_id/tasks', tasks.create);

	app.delete('/api/project/:project_id/task/:task_id', tasks.delete);


	// *** Performs ***
	app.get('/api/project/:project_id/task/:task_id/performs', performs.list);

	app.put('/api/project/:project_id/task/:task_id/perform/:perform_id', performs.update);

	app.post('/api/project/:project_id/task/:task_id/performs', performs.create);

	app.delete('/api/project/:project_id/task/:task_id/perform/:perform_id', performs.delete);

};