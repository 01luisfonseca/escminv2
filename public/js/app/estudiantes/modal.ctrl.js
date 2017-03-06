(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('modalEstudiantesCtrl', controller);
    
    function controller(EstudiantesFct, $uibModalInstance, items, $window){
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
           EstudiantesFct.update({id:vm.data.id}, vm.data).$promise.then((data)=>{ok();});
        }
         function ok() {
            $uibModalInstance.close('Cerrado con OK');
        }
        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }
    }
    
})()