'use strict';

/* Controllers */

var hourMachineControllers = angular.module('hourMachineControllers', ['ui.bootstrap']);

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
        var modalInstance = $modal.open({
            templateUrl: '/partials/addproject.html',
            controller: function ($scope, $modalInstance) {
                $scope.project = {name : ''};

                $scope.add = function () {
                    $modalInstance.close($scope.project.name);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function(name){
            $scope.selected = name;
        },function(){
            $scope.selected = 'You decided not to enter in your name, that makes me sad.';
        });
    };

    $scope.addTask = function () {
        var modalInstance = $modal.open({
            templateUrl: '/partials/addtask.html',
            controller: function ($scope, $modalInstance) {
                $scope.project = {name : ''};

                $scope.add = function () {
                    $modalInstance.close($scope.project.name);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function(name){
            $scope.selected = name;
        },function(){
            $scope.selected = 'You decided not to enter in your name, that makes me sad.';
        });
    };

    $scope.addPerform = function () {
        var modalInstance = $modal.open({
            templateUrl: '/partials/addperform.html',
            controller: function ($scope, $modalInstance) {
                $scope.project = {name : ''};

                $scope.add = function () {
                    $modalInstance.close($scope.project.name);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function(name){
            $scope.selected = name;
        },function(){
            $scope.selected = 'You decided not to enter in your name, that makes me sad.';
        });
    };
}]);


