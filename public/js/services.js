'use strict';

/* Services */

var hourMachineServices = angular.module('hourMachineServices', ['ngResource']);

hourMachineServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);
