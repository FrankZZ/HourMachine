'use strict';

/* Controllers */

var hourMachineControllers = angular.module('hourMachineControllers', []);

hourMachineControllers.controller('ProjectController',
    ["$scope","$routeParams","$rootScope","$modal",'$location',"ProjectService",
function ($scope, $routeParams, $rootScope, $modal, $location, ProjectService) {
    //For breadcrumb
    //--------------
    $rootScope.taskDetailBtnShow = false;
    $rootScope.taskDetailBtnActive = false;
    $rootScope.projectDetailBtnShow = false;
    $rootScope.projectDetailBtnActive = false;
    //--------------

    ProjectService.get()
        .success(function(data) {
            $scope.projectList = data;
        });

    $rootScope.clickNew = function () {
        var startData = {
            name:"",
            totalHours:"00:00"
        };
        var modalSettings = {
            title:"Add Project",
            buttonName:"Save",
            delbuttonhidden:"true",
            templateUrl:'/partials/addedit.html'
        };

        cudModal($scope, $modal, modalSettings, startData,function(newData){
            ProjectService.create(newData.data)
                .success(function(retData) {
                    //$scope.projectList.push(data);
                    $scope.projectList = retData;
                });
        });
    };
    $scope.editRow = function (data){
        var modalSettings = {
            title:"Edit Project",
            buttonName:"Save",
            delbuttonhidden:"false",
            templateUrl:'/partials/addedit.html'
        };
        cudModal($scope, $modal, modalSettings, data,function(newData){
            if(newData.del == "false"){
                ProjectService.update(newData.data)
                    .success(function(retData) {
                        $scope.projectList = retData;
                    });
            }else if(newData.del == "true"){
                ProjectService.delete(newData.data.id)
                    .success(function(retData) {
                        $scope.projectList = retData;
                    });
            }
        });
    };
    $scope.goDetail = function (project){
        //For breadcrumb
        //--------------
        $rootScope.projectDetailUrl = "#/project/"+project._id+"/tasks";
        $rootScope.projectDetailBtn = project.name;
        //--------------
        $location.path("/project/"+project._id+"/tasks");


    };
}]);
hourMachineControllers.controller('ProjectDetailController',
    ["$scope","$routeParams","$rootScope","$modal",'$location',"ProjectDetailService",
function ($scope, $routeParams, $rootScope, $modal, $location, ProjectDetailService) {
    //For breadcrumb
    //--------------
    $rootScope.taskDetailBtnShow = false;
    $rootScope.taskDetailBtnActive = false;
    $rootScope.projectDetailBtnShow = true;
    $rootScope.projectDetailBtnActive = true;
    //--------------
    ProjectDetailService.setCurrentProjectId($routeParams.project_id);

    ProjectDetailService.get()
        .success(function(data) {
            $scope.taskList = data;
        });

    $rootScope.clickNew = function () {
        var startData = {
            name:"",
            totalHours:"00:00"
        };
        var modalSettings = {
            title:"Add Task",
            buttonName:"Save",
            delbuttonhidden:"true",
            templateUrl:'/partials/addedit.html'
        };

        cudModal($scope, $modal, modalSettings, startData,function(newData){
            ProjectDetailService.create(newData.data)
                .success(function(retData) {
                    //$scope.projectList.push(data);
                    $scope.taskList = retData;
                });
        });
    };
    $scope.editRow = function (data){
        var modalSettings = {
            title:"Edit Task",
            buttonName:"Save",
            delbuttonhidden:"false",
            templateUrl:'/partials/addedit.html'
        };
        cudModal($scope, $modal, modalSettings, data,function(newData){
            if(newData.del == "false"){
                ProjectDetailService.update(newData.data)
                    .success(function(retData) {
                        $scope.taskList = retData;
                    });
            }else if(newData.del == "true"){
                ProjectDetailService.delete(newData.data.id)
                    .success(function(retData) {
                        $scope.taskList = retData;
                    });
            }
        });
    };
    $scope.goDetail = function (task){
        //For breadcrumb
        //--------------
        $rootScope.taskDetailUrl = "#/project/"+ProjectDetailService.getCurrentProjectId()+"/task/"+task._id+"/performs";
        $rootScope.taskDetailBtn = task.name;
        //--------------
        $location.path("/project/"+ProjectDetailService.getCurrentProjectId()+"/task/"+task._id+"/performs");
    };
}]);
//TaskDetailController
hourMachineControllers.controller('TaskDetailController',
    ["$scope","$routeParams","$rootScope","$modal",'$location',"TaskDetailService",
function ($scope, $routeParams, $rootScope, $modal, $location, TaskDetailService) {
    //For breadcrumb
    //--------------
    $rootScope.taskDetailBtnShow = true;
    $rootScope.taskDetailBtnActive = true;
    $rootScope.projectDetailBtnShow = true;
    $rootScope.projectDetailBtnActive = false;
    //--------------
    TaskDetailService.setCurrentProjectId($routeParams.project_id);
    TaskDetailService.setCurrentTaskId($routeParams.task_id);

    TaskDetailService.get()
        .success(function(data) {
            $scope.performList = data;
        });

}]);
//hourMachineControllers.controller('PerformsController', ["$scope","$rootScope","$modal", "PerformsService", function ($scope,$rootScope,$modal,PerformsService) {
//    PerformsService.get()
//        .success(function(data) {
//            $scope.projectList = data;
//        });
//    $rootScope.clickNew = function () {
//
//        var datenow = new Date();
//        var datenowString = datenow.getFullYear()+"-"+((datenow.getMonth() < 10) ? "0"+datenow.getMonth() : datenow.getMonth())+"-"+((datenow.getDate() < 10) ? "0"+datenow.getDate() : datenow.getDate());
//
//        var startData = {
//            date:datenowString,
//            fromTime:"",
//            toTime:"",
//            pauseTime:"",
//            totalHours:"",
//            comment:"",
//            task:""
//        };
//        var modalSettings = {title:"Add Perform",buttonName:"ADD", delbuttonhidden:"true", templateUrl:'/partials/addeditperform.html'};
//
//        cudModal($scope, $modal, modalSettings, startData,function(newData){
//
//        });
//    };
//}]);

hourMachineControllers.controller('MainController',
    ["$scope","$routeParams","$modal",'$location',
 function($scope, $routeParams, $modal, $location) {

    //alert($location);
     /*This is for activive menu button*/
    ////<li ng-class="{ active: isActive('/login')}"><a href="#/login">Login</a></li>
    //$scope.isActive = function (viewLocation) {
    //    return viewLocation === $location.path();
    //};

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
function cudModal($scope, $modal, settings, data, callback){
    var modalInstance = $modal.open({
        templateUrl: settings.templateUrl,
        controller: function ($scope, $modalInstance) {
            $scope.title = settings.title;
            $scope.buttonName = settings.buttonName;
            $scope.delbuttonhidden = settings.delbuttonhidden;

            $scope.data = angular.copy(data);

            $scope.setTime = function(){
                if($scope.data.fromTime != "" && $scope.data.toTime != ""){
                    var totalHoursArr = new Date(new Date("1/1/1970 "+angular.copy($scope.data.toTime)) - new Date("1/1/1970 "+angular.copy($scope.data.fromTime))).toUTCString().split(" ")[4].split(":");
                    var totalHoursDate = new Date("1/1/1970 "+totalHoursArr[0]+":"+totalHoursArr[1]);


                    var pauseTimeDate = new Date("1/1/1970 "+angular.copy($scope.data.pauseTime));
                    if(totalHoursDate > pauseTimeDate){
                        totalHoursDate.setMinutes(totalHoursDate.getMinutes() - (pauseTimeDate.getHours()*60+pauseTimeDate.getMinutes()));
                        totalHoursDate.setHours(totalHoursDate.getHours() + 1);
                    }

                   var retTotalHoursDate = totalHoursDate.toUTCString().split(" ")[4].split(":");
                   $scope.data.totalHours = retTotalHoursDate[0]+":"+retTotalHoursDate[1];

                }else{
                    $scope.data.totalHours = "";
                }


            };

            $scope.click = function (del) {
                $modalInstance.close({data:$scope.data,del:del});
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    });

    modalInstance.result.then(function(retdata){
        callback(retdata);
    },function(){
        callback(null);
    });
};

