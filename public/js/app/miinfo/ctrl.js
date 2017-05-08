(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('MiiController', ['PerfilFct', '$window', controller]);
    
    function controller(PerfilFct, $window){
        var vm=this;
        
        //Variables
        vm.data={};
        vm.set={
            password:'',
            newpassword:''
        };

        //Funciones
        vm.actPw=actPw;

        
        //Lanzamiento automático
        activate();
        
        //Declaracion de funciones
        function activate(){
            getDatas();
        }
        function getDatas(){
            return PerfilFct.query({},(data)=>{
                vm.data=data;
            })
        }
        function actPw(){
            if(vm.set.password!==vm.set.newpassword) return $window.alert('Las contraseñas deben coincidir');
            return PerfilFct.update({},vm.set,(data)=>{
                $window.alert(data.msj);
            });
        }
    }
    
})()