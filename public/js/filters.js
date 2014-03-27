'use strict';

/* Filters */
var hourMachineFilters = angular.module('hourMachineFilters', []);
hourMachineFilters.filter('searchForName', function() {
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();

        angular.forEach(arr, function(item){
            if(item.name.toLowerCase().indexOf(searchString) !== -1){
                result.push(item);
            }
        });
        return result;
    };
});
hourMachineFilters.filter('searchForDate', function() {
    return function(arr, searchString){
        if(!searchString){
            return arr;
        }
        var result = [];
        searchString = searchString.toLowerCase();

        angular.forEach(arr, function(item){
            if(item.dateString.toLowerCase().indexOf(searchString) !== -1){
                result.push(item);
            }
        });
        return result;
    };
});

