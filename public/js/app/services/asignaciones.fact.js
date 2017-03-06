/**
 * Factoria de asignaciones
 * @namespace App.Services
 */
(function(){
	'use strict';
	angular.module('app.services')
    .factory('AsignacionesFct',['$resource',factory]);
    
    function factory($resource){
        return $resource('api/asignaciones/:id', {},{});
    }
})()