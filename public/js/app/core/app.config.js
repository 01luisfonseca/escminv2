/**
 * Configuración de Modulo App
 * @namespace App
 */
(function () {
	'use strict';
	angular.module('app').config(['$routeProvider', '$locationProvider',configuration]);

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
            .when('/programacion', {
                templateUrl: 'js/app/programacion/index.html',
                controller: 'ProgramacionController',
                controllerAs:'vm'
            })
            .when('/login', {
                templateUrl: 'js/app/login/index.html',
                controller: 'loginCtrl',
                controllerAs:'vm'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }
    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.access_token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();