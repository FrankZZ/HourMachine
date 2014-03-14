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
        addModal($scope, $modal, $log,"Project", function(name){
            $scope.selected = name;
        });
    };

    $scope.addTask = function () {
        addModal($scope, $modal, $log,"Task", function(name){
            $scope.selected = name;
        });
    };

    $scope.addPerform = function () {
        addModal($scope, $modal, $log,"Perform", function(name){
            $scope.selected = name;
        })
    };
}]);

function addModal($scope, $modal, $log, title, callback){
    var modalInstance = $modal.open({
        templateUrl: '/partials/add.html',
        controller: function ($scope, $modalInstance) {
            $scope.title = title;
            $scope.data = {name : ''};

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

