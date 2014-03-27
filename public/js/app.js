'use strict';

/* App Module */
var hourMachineApp = angular.module('hourMachineApp', [
  'ngRoute',
  'hourMachineAnimations',
  'hourMachineDirectives',
  'hourMachineControllers',
  'hourMachineFilters',
  'hourMachineServices',
  'ui.bootstrap'
]);

hourMachineApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginController'
        }).
        when('/projects', {
            templateUrl: 'partials/projects.html',
            controller: 'ProjectController'
        }).
        when('/project/:project_id/tasks', {
            templateUrl: 'partials/tasks.html',
            controller: 'ProjectDetailController'
        }).
        when('/project/:project_id/task/:task_id/performs', {
            templateUrl: 'partials/performs.html',
            controller: 'TaskDetailController'
        }).
        otherwise({
            redirectTo: '/login'
        });
  }]);

