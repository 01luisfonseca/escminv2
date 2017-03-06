/**
 * Factoria de discursos
 * @namespace App.Services
 */
(function(){
	'use strict';
	angular.module('app.services')
    .factory('DiscursosFct',['$resource',factory]);
    
    function factory($resource){
        return $resource('api/discursos/:id', {}, {});
    }
})()