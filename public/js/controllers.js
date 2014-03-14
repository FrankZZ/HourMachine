'use strict';

/* Controllers */

var hourMachineControllers = angular.module('hourMachineControllers', ['ui.bootstrap']);

hourMachineControllers.controller('MainCtrl', ['$scope', '$routeParams', 'Phone',function($scope, $routeParams, Phone) {

 }]);

hourMachineControllers.controller('AddProjectController', ['$scope', '$modal', '$log',function($scope, $modal, $log) {
    $scope.open = function () {

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
}]);
hourMachineControllers.controller('AddTaskController', ['$scope', '$modal', '$log',function($scope, $modal, $log) {
    $scope.open = function () {

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
}]);
hourMachineControllers.controller('AddPerformController', ['$scope', '$modal', '$log',function($scope, $modal, $log) {
    $scope.open = function () {

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

