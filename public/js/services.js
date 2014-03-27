'use strict';

/* Services */
var hourMachineServices = angular.module('hourMachineServices', ['ngResource']);

hourMachineServices.factory('ProjectService', function($http,$resource){
    return {
        list : function() {
            return $http.get('/api/projects');
        },
        create : function(projectData) {
            return $http.post('/api/projects', projectData);
        },
        delete : function(projectData) {
            return $http.delete('/api/project/' + projectData.id);
        },
        update : function(projectData){
            return $http.put('/api/project/' + projectData.id, projectData);
        }
    }
});
hourMachineServices.factory('ProjectDetailService', function($http){
    var currentProjectId = null
    return {
        list : function() {
            return $http.get('/api/project/'+currentProjectId+'/tasks/');
        },
        create : function(taskData) {
            return $http.post('/api/project/'+currentProjectId+'/tasks/', taskData);
        },
        delete : function(taskData) {
            return $http.delete('/api/project/'+currentProjectId+'/task/' + taskData.id);
        },
        update : function(taskData){
            return $http.put('/api/project/'+currentProjectId+'/task/' + taskData.id, taskData);
        },
        setCurrentProjectId : function(projectId){
            currentProjectId = projectId;
        },
        getCurrentProjectId : function(projectId){
            return currentProjectId;
        },
        getCurrentProjectName : function(){
            return $http.get('/api/project/'+currentProjectId);
        }
    }
});
hourMachineServices.factory('TaskDetailService', function($http){
    var currentProjectId = null;
    var currentTaskId = null;
    return {
        list : function() {
            return $http.get('/api/project/'+currentProjectId+'/task/'+currentTaskId+'/performs');
        },
        create : function(performData) {
            return $http.post('/api/project/'+currentProjectId+'/task/'+currentTaskId+'/performs', performData);
        },
        delete : function(performData) {
            return $http.delete('/api/project/'+currentProjectId+'/task/'+currentTaskId+'/perform/' + performData.id);
        },
        update : function(performData){
            return $http.put('/api/project/'+currentProjectId+'/task/'+currentTaskId+'/perform/' + performData.id, performData);
        },
        setCurrentProjectIdAndTaskId : function(projectId,taskId){
            currentProjectId = projectId;
            currentTaskId = taskId;
        },
        getCurrentProjectId : function(projectId){
            return currentProjectId;
        },
        getCurrentProjectName : function(){
            return $http.get('/api/project/'+currentProjectId);
        },
        getCurrentTaskId : function(projectId){
            return currentTaskId;
        },
        getCurrentTaskName : function(){
            return $http.get('/api/project/'+currentProjectId+'/task/'+currentTaskId);
        }
    }
});

//hourMachineServices.factory('ProjectService', function($http,$resource){
//    return {
//        get : function() {
//            return $resource('/api/projects/', {}, {
//                get: { method: 'GET', isArray: true }
//            }).get();
//        },
//        create : function(data) {
//            $resource('/api/projects/', {},{
//                create: {method:'POST'}
//            }).create(data);
//
//            return this.get();
//        },
//        delete : function(data) {
//            data.project_id = data.id;
//
//            $resource('/api/project/:project_id', {}, {
//                delete: { method: 'DELETE'}
//            }).delete(data);
//
//            return this.get();
//        },
//        update : function(data){
//            data.project_id = data.id;
//            return $http.put('/api/project/'+ data.id, data);
//        }
//    }

//update: { method: 'PUT', params: data}
//update: { method: 'PUT', params:{project_id: '@project_id'}}

//    return $resource('/api/projects/:project_id', {}, {
//        get: {method:'GET', params:{}, isArray:true},
//        create:{method:'POST'},
//        update: { method: 'PUT', params: {project_id: '@id'} },
//        delete: { method: 'DELETE', params: {project_id: '@id'} }
//    });