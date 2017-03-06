/**
 * Factoria de estudiantes
 * @namespace App.Services
 */
(function(){
	'use strict';
	angular.module('app.services')
    .factory('EstudiantesFct',['$resource',factory]);
    
    function factory($resource){
        return $resource('api/estudiantes/:id', {}, {
        	'update': { method:'PUT' },
        	'asignable': { 
        		method:'GET',
        		url: 'api/estudiantes/asignables/:genero',
        		isArray: true
        	}    	
        });
    }
})()