/**
 * Factoria de asignaciones
 * @namespace App.Services
 */
(function() {
    'use strict';
    angular.module('app.services')
        .factory('AsignacionesFct', ['$resource', factory]);

    function factory($resource) {
        return $resource('api/asignaciones/:id', {}, {
            'proxpoint': {
                method: 'POST',
                url: 'api/asignaciones/punto',
                isArray: false
            },
            'update': {
                method: 'PUT'
            },
            'clean': {
                method: 'POST',
                url: 'api/asignaciones/limpieza',
                isArray: false
            }
        });
    }
})()