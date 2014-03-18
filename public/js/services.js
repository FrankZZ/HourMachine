'use strict';

/* Services */

var hourMachineServices = angular.module('hourMachineServices', ['ngResource']);

hourMachineServices.factory('ProjectService', function($resource){
    return $resource('http://localhost:3000/testdate.json');
});
hourMachineServices.factory('TaskService', function($resource){
    return $resource('http://localhost:3000/testdate.json');
});
hourMachineServices.factory('PerformsService', function($resource){
    return $resource('http://localhost:3000/testdate.json');
});