(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('EspecificoController', ['$routeParams', 'MotosFct', controller]);
    
    function controller($routeParams, MotosFct){
        var vm=this;
        
        //Variables
        vm.id=parseInt($routeParams.id);
        vm.motos=MotosFct.get();
        
        //Funciones visibles
        
        //Lanzamiento automático
        
        //Declaracion de funciones
        function verInfo(){
        }
    }
    
})()