'use strict';

/* Controllers */
var hourMachineControllers = angular.module('hourMachineControllers', []);

hourMachineControllers.controller('ProjectController',
    ["$scope","$routeParams","$rootScope","$modal",'$location',"ProjectService",
function ($scope, $routeParams, $rootScope, $modal, $location, ProjectService){

    $rootScope.setProject();

    ProjectService.list()
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
            templateUrl:'/partials/cud.html'
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
            templateUrl:'/partials/cud.html'
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

    ProjectDetailService.setCurrentProjectId($routeParams.project_id);

    ProjectDetailService.getCurrentProjectName()
    .success(function(data) {
        $rootScope.setProjectDetail(data);
    }).error(function() {
        // TODO: error handling

    });

    ProjectDetailService.list()
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
            templateUrl:'/partials/cud.html'
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
            templateUrl:'/partials/cud.html'
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
        $location.path("/project/"+$routeParams.project_id+"/task/"+task.id+"/performs");
    };
}]);

hourMachineControllers.controller('TaskDetailController',
    ["$scope","$routeParams","$rootScope","$modal",'$location',"TaskDetailService",
function ($scope, $routeParams, $rootScope, $modal, $location, TaskDetailService) {

    TaskDetailService.setCurrentProjectIdAndTaskId($routeParams.project_id,$routeParams.task_id);

    TaskDetailService.getCurrentProjectName()
    .success(function(dataProject) {
        TaskDetailService.getCurrentTaskName()
        .success(function(dataTask) {
                $rootScope.setTaskDetail(dataProject,dataTask);
        }).error(function() {
            // TODO: error handling

        });
    }).error(function() {
        // TODO: error handling

    });


    TaskDetailService.list()
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
            templateUrl:'/partials/cudPerform.html'
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
            templateUrl:'/partials/cudPerform.html'
        };

        var startDate = new Date();
        startDate.setTime(data.startDate*1000);
        var startDateString =startDate.toTimeString().replace(/.*(\d{2}:\d{2}):\d{2}.*/, "$1");

        var endDate = new Date();
        endDate.setTime(data.endDate*1000);
        var endDateString =endDate.toTimeString().replace(/.*(\d{2}:\d{2}):\d{2}.*/, "$1");

        var pauseTime = new Date("1/1/1970 ");
        pauseTime.setSeconds(data.pauseTime);
        var pauseTimeString =pauseTime.toTimeString().replace(/.*(\d{2}:\d{2}):\d{2}.*/, "$1");

        var date = data.dateString.split("-");
        var dateString = date[2]+"-"+date[1]+"-"+date[0];
        //var dateString = startDate.getFullYear()+"-"+((startDate.getMonth() < 10) ? "0"+(startDate.getMonth()+1) : (startDate.getMonth()+1))+"-"+((startDate.getDate() < 10) ? "0"+startDate.getDate() : startDate.getDate());
        //var startDateString = ((startDate.getHours() < 10) ? "0"+(startDate.getHours()) : (startDate.getHours()))+":"+((startDate.getMinutes() < 10) ? "0"+(startDate.getMinutes()) : (startDate.getMinutes()));
        //var endDateString = ((endDate.getHours() < 10) ? "0"+(endDate.getHours()) : (endDate.getHours()))+":"+((endDate.getMinutes() < 10) ? "0"+(endDate.getMinutes()) : (endDate.getMinutes()));
        //var pauseTimeString = ((pauseTime.getHours() < 10) ? "0"+(pauseTime.getHours()) : (pauseTime.getHours()))+":"+((pauseTime.getMinutes() < 10) ? "0"+(pauseTime.getMinutes()) : (pauseTime.getMinutes()));
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

    };

}]);

hourMachineControllers.controller('MainController',
    ["$scope","$rootScope","$routeParams","$modal",'$location',
function($scope,$rootScope, $routeParams, $modal, $location) {

    $rootScope.setProject = function(){
        //For breadcrumb
        //--------------
        $scope.taskDetailBtnShow = false;
        $scope.taskDetailBtnActive = false;
        $scope.projectDetailBtnShow = false;
        $scope.projectDetailBtnActive = false;
        //--------------

        if (localStorage) {
            localStorage.urlpath = "/projects";
        }
        if(sessionStorage){
            if(!sessionStorage.email){
                $location.path("/login");
            }
        }
    }

    $rootScope.setProjectDetail = function(project){
        //For breadcrumb
        //--------------
        $scope.projectDetailUrl = "#/project/"+project.id+"/tasks";
        $scope.projectDetailBtn = project.name;

        $scope.taskDetailBtnShow = false;
        $scope.taskDetailBtnActive = false;
        $scope.projectDetailBtnShow = true;
        $scope.projectDetailBtnActive = true;
        //--------------

        if (localStorage) {
            localStorage.urlpath = "/project/"+project.id+"/tasks";
        }
        if(sessionStorage){
            if(!sessionStorage.email){
                $location.path("/login");
            }
        }
    }
    $rootScope.setTaskDetail = function(project,task){
        //For breadcrumb
        //--------------
        $scope.projectDetailUrl = "#/project/"+project.id+"/tasks";
        $scope.projectDetailBtn = project.name;

        $scope.taskDetailUrl = "#/project/"+project.id+"/task/"+task.id+"/performs";
        $scope.taskDetailBtn = task.name;

        $scope.taskDetailBtnShow = true;
        $scope.taskDetailBtnActive = true;
        $scope.projectDetailBtnShow = true;
        $scope.projectDetailBtnActive = false;
        //--------------
        if (localStorage) {
            localStorage.urlpath = "/project/"+project.id+"/task/"+task.id+"/performs";
        }
        if(sessionStorage){
            if(!sessionStorage.email){
                $location.path("/login");
            }
        }
    }

    $scope.clearLocalStorage = function () {
        localStorage.clear();
    };
    $scope.logout = function () {
        sessionStorage.clear();
        $location.path("/login");
    }
}]);


hourMachineControllers.controller('loginController',
    ["$scope","$routeParams","$rootScope","$modal",'$location',
function ($scope, $routeParams, $rootScope, $modal, $location) {
     if(sessionStorage){
         if(sessionStorage.email){
             if (localStorage) {
                 if(!localStorage.urlpath){
                     localStorage.urlpath = "/projects";
                 }
                 $location.path(localStorage.urlpath);
             }
         }
     }
     $scope.login= function () {
         if(sessionStorage){
             sessionStorage.email = $scope.email;
             //TODO request server
             if (localStorage) {
                 if(!localStorage.urlpath){
                     localStorage.urlpath = "/projects";
                 }
                 $location.path(localStorage.urlpath);
             }
         }
     }
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
                //FOR THE LIVE TotalTime
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
                        date.setSeconds(retSecondens);
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

