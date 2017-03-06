/**
 * Factoria de recurso
 * @namespace App.Services
 */
(function(){
	'use strict';
	angular.module('app.services')
    .factory('MotosFct',['$resource',factory]);
    
    function factory($resource){
        return $resource('js/data/database.txt', {}, {});
    }
})()