(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('EstudianteController', ['$routeParams','EstudiantesFct', controller]);
    
    function controller($routeParams, EstudiantesFct){
        var vm=this;
        
        //Variables
        vm.id=$routeParams.id;

        //Funciones
        
        //Lanzamiento automático
        
        //Declaracion de funciones
    }
    
})()