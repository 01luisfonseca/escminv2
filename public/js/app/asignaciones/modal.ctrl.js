(function(){

    /*

        El modal es quien filtra la información de los estudiantes para que se muestre según la necesidad, según la
        presentación

    */


	'use strict';
	angular.module('app.inicial')
    .controller('modalAsigEstCtrl', controller);
    
    function controller(EstudiantesFct, $uibModalInstance, items, $window){
        var vm=this;
        
        //Variables
        vm.data = items;
        console.log(items);

        //Funciones
        vm.ok=ok;
        vm.cancel=cancel;
        
        //Lanzamiento automático
        activate();
        
        //Declaracion de funciones
        function activate(){
        }
        function getAlumnos(genero){
            if (!genero) genero='ambos';
            return EstudiantesFct.asignable({genero:genero},(data)=>{
                console.log(data);
            })
        }
         function ok() {
            $uibModalInstance.close('Cerrado con OK');
        }
        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }
    }
    
})()