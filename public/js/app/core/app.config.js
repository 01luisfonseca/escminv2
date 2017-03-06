/**
 * Configuración de Modulo App
 * @namespace App
 */
(function () {
	'use strict';
	angular.module('app')
		.config(['$routeProvider', '$locationProvider',configuration]);

	/**
   * @namespace Configuration
   * @desc Configuración de App
   * @memberOf App
   */
	function configuration($routeProvider, $locationProvider){
        $routeProvider
            .when('/inicial', {
                templateUrl: 'js/app/inicial/index.html',
                controller: 'InicialController',
                controllerAs:'vm'
            })
            .when('/inicial/:id', {
                templateUrl: 'js/app/inicial/especifico.html',
                controller: 'EspecificoController',
                controllerAs:'vm'
            })
            .when('/estudiantes', {
                templateUrl: 'js/app/estudiantes/index.html',
                controller: 'EstudiantesController',
                controllerAs:'vm'
            })
            .when('/discursos', {
                templateUrl: 'js/app/discursos/index.html',
                controller: 'DiscursosController',
                controllerAs:'vm'
            })
            .when('/asignaciones', {
                templateUrl: 'js/app/asignaciones/index.html',
                controller: 'AsignacionesController',
                controllerAs:'vm'
            })
            .otherwise({
                redirectTo: '/inicial'
            });
    }
})()