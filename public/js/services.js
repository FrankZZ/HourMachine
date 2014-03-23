'use strict';

/* Services */

var hourMachineServices = angular.module('hourMachineServices', ['ngResource']);

hourMachineServices.factory('ProjectService', function($http){
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
        }
    }
});
hourMachineServices.factory('ProjectDetailService', function($http){
    var currentProjectId = null;
    return {
        get : function() {
            return $http.get('/api/project/'+currentProjectId+'/tasks/');
        },
        create : function(taskData) {
            return $http.post('/api/project/'+currentProjectId+'/tasks/', taskData);
        },
        delete : function(id) {
            return $http.delete('/api/project/'+currentProjectId+'/task/' + id);
        },
        update : function(taskData){
            return $http.put('/api/project/'+currentProjectId+'/task/' + taskData.id, taskData);
        },
        setCurrentProject : function(projectId) {
            currentProjectId = projectId;
            return currentProjectId;
        },
        getCurrentProject : function() {
            return currentProjectId;
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