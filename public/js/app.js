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
        controller: 'MainCtrl'
        }).
        when('/projects', {
        templateUrl: 'partials/projects.html',
        controller: 'ProjectController'
        }).
        when('/tasks', {
            templateUrl: 'partials/tasks.html',
            controller: 'TaskController'
        }).
        when('/performs', {
            templateUrl: 'partials/performs.html',
            controller: 'PerformsController'
        }).
        otherwise({
        redirectTo: '/login'
        });
  }]);

