(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('MiiController', ['PerfilFct', '$window','toastr', controller]);
    
    function controller(PerfilFct, $window,toastr){
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
            if(vm.set.password!==vm.set.newpassword) return toastr.error('Las contraseñas deben coincidir');
            return PerfilFct.update({},vm.set,(data)=>{
                toastr.success(data.msj)
                //$window.alert(data.msj);
            },()=>{
                toastr.error('No se ha actualizado la contraseña por un error.');
            });
        }
    }
    
})()