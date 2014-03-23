'use strict';

/* App Module */

var hourMachineApp = angular.module('hourMachineApp', [
  'ngRoute',
  'hourMachineAnimations',

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
            controller: 'MainController'
        }).
        when('/projects', {
            templateUrl: 'partials/projects.html',
            controller: 'ProjectController'
        }).
        when('/project/:project_id/tasks', {
            templateUrl: 'partials/tasks.html',
            controller: 'ProjectDetailController'
        }).
        when('/task/:task_id', {
            templateUrl: 'partials/performs.html',
            controller: 'PerformsController'
        }).
        otherwise({
            redirectTo: '/projects'
        });
  }]);

