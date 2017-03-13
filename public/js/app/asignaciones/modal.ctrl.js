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
        vm.alumnos=[];
        console.log(items);

        //Funciones
        vm.ok=ok;
        vm.cancel=cancel;
        vm.selAlumno=selAlumno;
        
        //Lanzamiento automático
        activate();
        
        //Declaracion de funciones
        function activate(){
            getAlumnos(vm.data.disc.gen, vm.data.type);
        }

        // Selecciona un alumno para enviarlo al controlador.
        function selAlumno(idx){
            for (var i = 0; i < vm.alumnos.length; i++) {
                if (vm.alumnos[i].id===idx) {
                     ok(vm.alumnos[i]);
                     break;
                }
            }
        }

        // Obtener todos los alumnos
        function getAlumnos(genero, tipo){
            vm.alumnos=[];
            if (!genero) genero='ambos';
            return EstudiantesFct.asignable({genero:genero, tipo:tipo},(data)=>{
                vm.alumnos=data;
                vm.alumnos.sort((a,b)=>{
                    if(a.name>b.name) return 1;
                    return -1;
                });
                for (var i = 0; i < vm.alumnos[i].asignaciones.length; i++) {
                   vm.alumnos[i].asignaciones.sort(function(a,b){
                        return new Date(b.updated_at) - new Date(a.updated_at);
                    });
                    for (var j = 0; j < vm.alumnos[i].asignaciones.length; j++) {
                        vm.alumnos[i].asignaciones[j].discursos.week = new Date(vm.alumnos[i].asignaciones[j].discursos.week);
                    }
                }
            });
        }
         function ok(sel) {
            $uibModalInstance.close(sel);
        }
        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }
    }
    
})();