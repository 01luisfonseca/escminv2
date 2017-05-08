(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('UsersController', ['UserFct', '$localStorage', controller]);
    
    function controller(UserFct, $localStorage){
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
            return UserFct.query({},(data)=>{
                vm.datas=data;
            })
        }
    }
    
})()