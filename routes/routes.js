// routes/routes.js

var index = require('./index');
var projects = require('./projects');
var tasks = require('./tasks');
var performs = require('./performs');

module.exports = function (app)
{

	// *** Projects ***
	app.get('/api/projects', index.list);

	app.put('/api/project/:project_id', projects.update);

	app.post('/api/projects', index.createproject);

	app.delete('/api/project/:project_id', projects.delete);


	// *** Tasks ***
	app.get('/api/tasks', tasks.list);

	// app.put('/api/task/:task_id', tasks.update);

	app.post('/api/tasks', tasks.create);

	app.delete('/api/task/:task_id', tasks.delete);


	// *** Performs ***
	app.get('/api/performs', performs.list);

	// app.put('/api/perform/:perform_id', performs.update);

	app.post('/api/performs', performs.create);

	app.delete('/api/perform/:perform_id', performs.delete);

};