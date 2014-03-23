'use strict';

/* Services */

var hourMachineServices = angular.module('hourMachineServices', ['ngResource']);

hourMachineServices.factory('ProjectService', function($http){
    var currentProject = null;
    return {
        get : function() {
            return $http.get('/api/projects');
        },
        create : function(projectData) {
            return $http.post('/api/projects', projectData);
        },
        delete : function(id) {
            return $http.delete('/api/project/' + id);
        },
        update : function(projectData){
            return $http.put('/api/project/' + projectData.id, projectData);
        },
        setCurrentProject : function(project) {
            currentProject = project;
            return currentProject;
        },
        getCurrentProject : function() {
            return currentProject;
        }
    }
});
hourMachineServices.factory('ProjectDetailService', function($http){
    var currentProject = null;
    return {
        get : function() {
            return currentProject.tasks;
        },
        create : function(taskData) {
            return $http.post('/api/project/'+currentProject._id+'/tasks/', taskData);
        },
        delete : function(id) {
            return $http.delete('/api/project/'+currentProject._id+'/task/' + id);
        },
        update : function(taskData){
            return $http.put('/api/project/'+currentProject._id+'/task/' + taskData.id, taskData);
        },
        setCurrentProject : function(project) {
            currentProject = project;
            return currentProject;
        },
        getCurrentProject : function() {
            return currentProject;
        }
    }
});
//hourMachineServices.factory('PerformsService', function($http){
//    return {
//        get : function() {
//            return $http.get('/api/performs');
//        },
//        create : function(performData) {
//            return $http.post('/api/performs', performData);
//        },
//        delete : function(id) {
//            return $http.delete('/api/perform/' + id);
//        },
//        update : function(id,performData){
//            return $http.put('/api/perform/' + id, performData);
//        }
//    }
//});