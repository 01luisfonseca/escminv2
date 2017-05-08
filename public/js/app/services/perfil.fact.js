/**
 * Factoria de Perfil
 * @namespace App.Services
 */
(function(){
	'use strict';
	angular.module('app.services')
    .factory('PerfilFct',['$resource',factory]);
    
    function factory($resource){
        return $resource('api/perfil', {}, {
        	'update': { method:'PUT' },    	
        	'query': { method:'GET',isArray:false },    	
        });
    }
})()