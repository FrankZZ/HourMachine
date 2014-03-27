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
    }).error(function() {
        // TODO: error handling
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
                $scope.projectList.push(retData);
            }).error(function() {
                // TODO: error handling
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
                    var index = 0;
                    $scope.projectList.forEach(function(e) {
                        if (e.id === retData.id) {
                            $scope.projectList[index] = retData;
                        }
                        index++;
                    });
                }).error(function() {
                    // TODO: error handling
                });
            }else if(newData.del == "true"){
                ProjectService.delete(newData.data)
                .success(function() {
                    var index = 0;
                    $scope.projectList.forEach(function(e) {
                        if (e.id === newData.data.id) {
                            $scope.projectList.splice( index, 1 );
                        }
                        index++;
                    });
                }).error(function() {
                    // TODO: error handling
                });
            }
        });
    };
    $scope.goDetail = function (project){
        $location.path("/project/"+project.id+"/tasks");
    };
}]);
hourMachineControllers.controller('ProjectDetailController',
    ["$scope","$routeParams","$rootScope","$modal",'$location',"ProjectDetailService",
function ($scope, $routeParams, $rootScope, $modal, $location, ProjectDetailService) {
    //For breadcrumb
    //--------------
    ProjectDetailService.setCurrentProjectId($routeParams.project_id);

    $rootScope.projectDetailUrl = "#/project/"+$routeParams.project_id+"/tasks";
    ProjectDetailService.getCurrentProjectName()
    .success(function(data) {
        $rootScope.projectDetailBtn = data.name;
    }).error(function() {
        // TODO: error handling
        $rootScope.projectDetailBtn = "Pro";
    });

    $rootScope.taskDetailBtnShow = false;
    $rootScope.taskDetailBtnActive = false;
    $rootScope.projectDetailBtnShow = true;
    $rootScope.projectDetailBtnActive = true;
    //--------------


    ProjectDetailService.get()
    .success(function(data) {
        $scope.taskList = data;
    }).error(function() {
        // TODO: error handling
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
                $scope.taskList.push(retData);
            }).error(function() {
                // TODO: error handling
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
                    var index = 0;
                    $scope.taskList.forEach(function(e) {
                        if (e.id === retData.id) {
                            $scope.taskList[index] = retData;
                        }
                        index++;
                    });
                }).error(function() {
                    // TODO: error handling
                });
            }else if(newData.del == "true"){
                ProjectDetailService.delete(newData.data)
                .success(function() {
                    var index = 0;
                    $scope.taskList.forEach(function(e) {
                        if (e.id === newData.data.id) {
                            $scope.taskList.splice( index, 1 );
                        }
                        index++;
                    });
                }).error(function() {
                    // TODO: error handling
                });
            }
        });
    };
    $scope.goDetail = function (task){
        $location.path("/project/"+ProjectDetailService.getCurrentProjectId()+"/task/"+task.id+"/performs");
    };
}]);

hourMachineControllers.controller('TaskDetailController',
    ["$scope","$routeParams","$rootScope","$modal",'$location',"TaskDetailService",
function ($scope, $routeParams, $rootScope, $modal, $location, TaskDetailService) {
    //For breadcrumb
    //--------------
    TaskDetailService.setCurrentProjectIdAndTaskId($routeParams.project_id,$routeParams.task_id);

    $rootScope.projectDetailUrl = "#/project/"+$routeParams.project_id+"/tasks";
    TaskDetailService.getCurrentProjectName()
    .success(function(data) {
        $rootScope.projectDetailBtn = data.name;
    }).error(function() {
        // TODO: error handling
        $rootScope.projectDetailBtn = "Pro";
    });

    $rootScope.taskDetailUrl = "#/project/"+$routeParams.project_id+"/task/"+$routeParams.task_id/+"/performs";
    TaskDetailService.getCurrentTaskName()
    .success(function(data) {
        $rootScope.taskDetailBtn = data.name;
    }).error(function() {
        // TODO: error handling
        $rootScope.taskDetailBtn = "Tas";
    });

    $rootScope.taskDetailBtnShow = true;
    $rootScope.taskDetailBtnActive = true;
    $rootScope.projectDetailBtnShow = true;
    $rootScope.projectDetailBtnActive = false;
    //--------------
    TaskDetailService.get()
        .success(function(data) {
            $scope.performList = data;
        }).error(function() {
            // TODO: error handling
        });

    $rootScope.clickNew = function () {
        var datenow = new Date();
        var datenowString = datenow.getFullYear()+"-"+((datenow.getMonth() < 10) ? "0"+(datenow.getMonth()+1) : (datenow.getMonth()+1))+"-"+((datenow.getDate() < 10) ? "0"+datenow.getDate() : datenow.getDate());
        var startData = {
            date:datenowString ,
            fromTime:"",
            toTime:"",
            pauseTime:"",
            totalHours:"",
            comment:""
        };
        var modalSettings = {
            title:"Add Perform",
            buttonName:"Save",
            delbuttonhidden:"true",
            templateUrl:'/partials/addeditperform.html'
        };

        cudModal($scope, $modal, modalSettings, startData,function(newData){

            var date = newData.data.date.split("-");

            var startDate = new Date(date[1]+"-"+date[2]+"-"+date[0]+" "+newData.data.fromTime).getTime() / 1000;
            var endDate =   new Date(date[1]+"-"+date[2]+"-"+date[0]+" "+newData.data.toTime).getTime() / 1000;

            var pauseTime = (new Date("1/1/1970 "+newData.data.pauseTime).getTime()/ 1000)- new Date("1/1/1970 00:00").getTime()/ 1000;
            if(pauseTime <=0){
                pauseTime = 0;
            }

            var retData = {
                startDate: startDate,	// seconds since 1/1/1970
                endDate: endDate,	// seconds since 1/1/1970
                pauseTime: pauseTime,	// seconds
                comment: newData.data.comment
            };
            //alert(" S "+retData.startDate +" E "+retData.endDate+" P "+retData.pauseTime+" C "+retData.comment);

            TaskDetailService.create(retData)
                .success(function(retData) {
                    $scope.performList.push(retData);
                }).error(function() {
                    // TODO: error handling
                });
        });
    };
    $scope.editRow = function (data){
        var modalSettings = {
            title:"Edit Perform",
            buttonName:"Save",
            delbuttonhidden:"false",
            templateUrl:'/partials/addeditperform.html'
        };

        var startDate = new Date();
        startDate.setTime(data.startDate*1000);
        var endDate = new Date();
        endDate.setTime(data.endDate*1000);

        var pauseTime = new Date("1/1/1970 ");
        pauseTime.setSeconds(data.pauseTime);

        var dateString = startDate.getFullYear()+"-"+((startDate.getMonth() < 10) ? "0"+(startDate.getMonth()+1) : (startDate.getMonth()+1))+"-"+((startDate.getDate() < 10) ? "0"+startDate.getDate() : startDate.getDate());

        var startDateString = ((startDate.getHours() < 10) ? "0"+(startDate.getHours()) : (startDate.getHours()))+":"+((startDate.getMinutes() < 10) ? "0"+(startDate.getMinutes()) : (startDate.getMinutes()));

        var endDateString = ((endDate.getHours() < 10) ? "0"+(endDate.getHours()) : (endDate.getHours()))+":"+((endDate.getMinutes() < 10) ? "0"+(endDate.getMinutes()) : (endDate.getMinutes()));
        var pauseTimeString = ((pauseTime.getHours() < 10) ? "0"+(pauseTime.getHours()) : (pauseTime.getHours()))+":"+((pauseTime.getMinutes() < 10) ? "0"+(pauseTime.getMinutes()) : (pauseTime.getMinutes()));
        var dataRow = {
            id:data.id,
            date:dateString ,
            fromTime:startDateString,
            toTime:endDateString,
            pauseTime:pauseTimeString,
            totalHours:"",
            comment:data.comment
        };

        cudModal($scope, $modal, modalSettings, dataRow,function(newData){
            var date = newData.data.date.split("-");

            var startDate = new Date(date[1]+"-"+date[2]+"-"+date[0]+" "+newData.data.fromTime).getTime() / 1000;
            var endDate =   new Date(date[1]+"-"+date[2]+"-"+date[0]+" "+newData.data.toTime).getTime() / 1000;

            var pauseTime = (new Date("1/1/1970 "+newData.data.pauseTime).getTime()/ 1000)- new Date("1/1/1970 00:00").getTime()/ 1000;
            if(pauseTime <=0){
                pauseTime = 0;
            }

            var retData = {
                id:newData.data.id,
                startDate: startDate,	// seconds since 1/1/1970
                endDate: endDate,	// seconds since 1/1/1970
                pauseTime: pauseTime,	// seconds
                comment: newData.data.comment
            };

            if(newData.del == "false"){
                //alert(retData.id+" "+retData.startDate+" "+retData.endDate+" "+retData.pauseTime+" "+retData.comment);
                TaskDetailService.update(retData)
                .success(function(retData) {
                    var index = 0;
                    $scope.performList.forEach(function(e) {
                        if (e.id === retData.id) {
                            $scope.performList[index] = retData;
                        }
                        index++;
                    });
                }).error(function() {
                    // TODO: error handling
                });
            }else if(newData.del == "true"){
                TaskDetailService.delete(retData)
                .success(function() {
                    var index = 0;
                    $scope.performList.forEach(function(e) {
                        if (e.id === retData.id) {
                            $scope.performList.splice( index, 1 );
                        }
                        index++;
                    });
                }).error(function() {
                    // TODO: error handling
                });
            }
        });
    };
    $scope.goDetail = function (perform){
        //$location.path("/project/"+ProjectDetailService.getCurrentProjectId()+"/task/"+task._id+"/performs");
    };

}]);

hourMachineControllers.controller('MainController',
    ["$scope","$routeParams","$modal",'$location',
 function($scope, $routeParams, $modal, $location) {

     /*This is for activive menu button*/
//    <li ng-class="{ active: isActive('/login')}"><a href="#/login">Login</a></li>
//    $scope.isActive = function (viewLocation) {
//        return viewLocation === $location.path();
//    };

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

                    var startDate = new Date("1/1/1970 "+angular.copy($scope.data.fromTime)).getTime() / 1000;
                    var endDate =   new Date("1/1/1970 "+angular.copy($scope.data.toTime)).getTime() / 1000;
                    var pauseTime = 0;
                    if($scope.data.pauseTime != ""){
                        pauseTime = (new Date("1/1/1970 "+angular.copy($scope.data.pauseTime)).getTime()/ 1000)- new Date("1/1/1970 00:00").getTime()/ 1000;
                    }
                    var retSecondens = (endDate -startDate)-pauseTime;

                    var date = new Date("1/1/1970 ");
                    if(retSecondens >0){
                        date.setSeconds((endDate -startDate)-pauseTime);
                    }else{
                        date.setSeconds(0);
                    }
                    var ret =  date.toTimeString().replace(/.*(\d{2}:\d{2}):\d{2}.*/, "$1");

                    $scope.data.totalHours = ret;
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
            $scope.setTime();
        }
    });

    modalInstance.result.then(function(retdata){
        callback(retdata);
    },function(){
        callback(null);
    });
};

