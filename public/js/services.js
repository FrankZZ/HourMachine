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
        setCurrentProjectId : function(projectId) {
            currentProjectId = projectId;
            return currentProjectId;
        },
        getCurrentProjectId : function() {
            return currentProjectId;
        }
    }
});
hourMachineServices.factory('TaskDetailService', function($http){
    var currentProjectId = null;
    var currentTaskId = null;
    return {
        get : function() {
            return $http.get('/api/project/'+currentProjectId+'/task/'+currentTaskId+'/performs');
        },
        create : function(taskData) {
            return $http.post('/api/project/'+currentProjectId+'/task/'+currentTaskId+'/performs', taskData);
        },
        delete : function(id) {
            return $http.delete('/api/project/'+currentProjectId+'/task/'+currentTaskId+'/perform/' + id);
        },
        update : function(taskData){
            return $http.put('/api/project/'+currentProjectId+'/task/'+currentTaskId+'/perform/' + taskData.id, taskData);
        },
        setCurrentProjectId : function(projectId) {
            currentProjectId = projectId;
            return currentProjectId;
        },
        getCurrentProjectId : function() {
            return currentProjectId;
        },
        setCurrentTaskId : function(taskId) {
            currentTaskId = taskId;
            return currentTaskId;
        },
        getCurrentTaskId : function() {
            return currentTaskId;
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