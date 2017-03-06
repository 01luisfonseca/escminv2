(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('DiscursosController', ['DiscursosFct', controller]);
    
    function controller(DiscursosFct){
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
            return DiscursosFct.query({},(data)=>{
                vm.datas=data;
            })
        }
    }
    
})()