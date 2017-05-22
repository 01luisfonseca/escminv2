(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('DiscursosController', ['DiscursosFct','$q', controller]);
    
    function controller(DiscursosFct,$q){
        var vm=this;
        
        //Variables
        vm.datas={};

        //Funciones

        
        //Lanzamiento automático
        activate();
        
        //Declaracion de funciones
        function activate(){
            getDatas();
        }
        function getDatas(){
            vm.cargando=$q.defer();
            return DiscursosFct.query({},(data)=>{
                vm.cargando.resolve();
                vm.datas=data;
            })
        }
    }
    
})()