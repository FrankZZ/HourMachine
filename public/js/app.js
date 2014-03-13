'use strict';

/* App Module */

var hourMachineApp = angular.module('hourMachineApp', [
  'ngRoute',
  'hourMachineAnimations',

  'hourMachineControllers',
  'hourMachineFilters',
  'hourMachineServices'
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
        controller: 'MainCtrl'
        }).
        when('/tasks', {
            templateUrl: 'partials/tasks.html',
            controller: 'MainCtrl'
        }).
        when('/performs', {
            templateUrl: 'partials/performs.html',
            controller: 'MainCtrl'
        }).
        when('/addproject', {
            templateUrl: 'partials/addproject.html',
            controller: 'MainCtrl'
        }).
        when('/addpreform', {
            templateUrl: 'partials/addpreform.html',
            controller: 'MainCtrl'
        }).
        when('/addtask', {
            templateUrl: 'partials/addtask.html',
            controller: 'MainCtrl'
        }).
        otherwise({
        redirectTo: '/login'
        });
  }]);
