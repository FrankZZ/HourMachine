'use strict';

/* Controllers */

var hourMachineControllers = angular.module('hourMachineControllers', []);

hourMachineControllers.controller('ProjectController', ["$scope","$rootScope","$modal", "ProjectService", function ($scope,$rootScope,$modal,ProjectService) {
    ProjectService.get(function(result) {
        $scope.projectList = result.projectlist;
    });
    $rootScope.clickNew = function () {
        addEditModal($scope, $modal, "Project", '',function(name){
            $rootScope.selected = name;
        });
    };
}]);
hourMachineControllers.controller('TaskController', ["$scope","$rootScope","$modal", "TaskService", function ($scope,$rootScope,$modal,TaskService) {
    TaskService.get(function(result) {
        $scope.taskList = result.tasklist;
    });
    $rootScope.clickNew = function () {
        addEditModal($scope, $modal, "Task",'',function(name){
            $rootScope.selected = name;
        });
    };
}]);
hourMachineControllers.controller('PerformsController', ["$scope","$rootScope","$modal", "PerformsService", function ($scope,$rootScope,$modal,PerformsService) {
    PerformsService.get(function(result) {
        $scope.performList = result.performlist;
    });
    $rootScope.clickNew = function () {
        var datenow = new Date();
        var datenowString =
            datenow.getFullYear()+"-"+
            ((datenow.getMonth() < 10) ? "0"+datenow.getMonth() : datenow.getMonth())+"-"+
            ((datenow.getDate() < 10) ? "0"+datenow.getDate() : datenow.getDate());
        addEditPerformModal($scope, $modal,"Perform",'',datenowString,function(name,date){
            $rootScope.selected = name + " " +date;
        });
    };
    $rootScope.clickNewTask = function () {
        addEditModal($scope, $modal, "Task",'',function(name){
            //$rootScope.selected = name;
        });
    };
}]);

hourMachineControllers.controller('MainController', ['$scope', '$modal', '$location',function($scope, $modal, $location) {
    /*This is for activive menu button*/
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
//    $scope.clickNew = function () {
//        if($location.path() === "/tasks"){
//            $scope.addTask();
//        }else if($location.path() === "/projects"){
//            $scope.addProject();
//        }else if($location.path() === "/performs"){
//            $scope.addPerform();
//        }
//    }
}]);

function addEditModal($scope, $modal, title, name, callback){
    var modalInstance = $modal.open({
        templateUrl: '/partials/addedit.html',
        controller: function ($scope, $modalInstance) {
            $scope.title = title;
            $scope.data = {name : name};

            $scope.add = function () {
                $modalInstance.close($scope.data.name);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    });

    modalInstance.result.then(function(name){
        callback(name);
    },function(){
        callback('You decided not to enter in your name, that makes me sad.');
    });
};

function addEditPerformModal($scope, $modal, title, name, date, callback){
    var modalInstance = $modal.open({
        templateUrl: '/partials/addeditperform.html',
        controller: function ($scope, $modalInstance) {
            $scope.title = title;
            $scope.data = {name : name, date : date};

            $scope.add = function () {
                $modalInstance.close($scope.data);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    });

    modalInstance.result.then(function(data){
        callback(data.name,data.date);
    },function(){
        callback('You decided not to enter in your name, that makes me sad.','');
    });
};
