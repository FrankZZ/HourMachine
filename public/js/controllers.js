'use strict';

/* Controllers */

var hourMachineControllers = angular.module('hourMachineControllers', []);

hourMachineControllers.controller('MainCtrl', ['$scope', '$routeParams', 'Phone',function($scope, $routeParams, Phone) {

 }]);
hourMachineControllers.controller('NavHeaderController', ['$scope', '$location',function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    $scope.isNew = function () {
        if($location.path() === "/tasks"){
            $scope.addTask();
        }else if($location.path() === "/projects"){
            $scope.addProject();
        }else if($location.path() === "/performs"){
            $scope.addPerform();
        }
    };
}]);
hourMachineControllers.controller('AddController', ['$scope', '$modal', '$log',function($scope, $modal, $log) {
    $scope.addProject = function () {
        addEditModal($scope, $modal, $log,"Project", '',function(name){
            $scope.selected = name;
        });
    };

    $scope.addTask = function () {
        addEditModal($scope, $modal, $log,"Task",'',function(name){
            $scope.selected = name;
        });
    };

    $scope.addPerform = function () {
        addEditPerformModal($scope, $modal, $log,"Perform",'','',function(name,date){
            $scope.selected = name + " " +date;
        });
    };
}]);

function addEditModal($scope, $modal, $log, title, name, callback){
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

function addEditPerformModal($scope, $modal, $log, title, name, date, callback){
    var modalInstance = $modal.open({
        templateUrl: '/partials/addeditperform.html',
        controller: function ($scope, $modalInstance) {
            $scope.title = title;
            $scope.data = {name : name, date : ''};

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
