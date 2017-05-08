/**
 * Factoria de Users
 * @namespace App.Services
 */
(function(){
	'use strict';
	angular.module('app.services')
    .factory('UserFct',['$resource',factory]);
    
    function factory($resource){
        return $resource('api/users/:id', {}, {
        	'update': { method:'PUT' },    	
        });
    }
})()