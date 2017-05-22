(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('modalEstudiantesCtrl', controller);
    
    function controller(EstudiantesFct, $uibModalInstance, items, $window,toastr){
        var vm=this;
        
        //Variables
        vm.data = items;
        vm.data.estado= vm.data.estado==1? true: false;

        //Funciones
        vm.ok=ok;
        vm.cancel=cancel;
        vm.actualizar=actualizar;
        
        //Lanzamiento automático
        activate();
        
        //Declaracion de funciones
        function activate(){
        }
        function actualizar(){
           EstudiantesFct.update({id:vm.data.id}, vm.data).$promise.then((data)=>{
                toastr.success('Se han actualizado los datos.');
               ok();
            },()=>{
                toastr.error('No se han actualizado los datos.');                
            });
        }
         function ok() {
            $uibModalInstance.close('Cerrado con OK');
        }
        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }
    }
    
})()