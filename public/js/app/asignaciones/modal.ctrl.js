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
        vm.ultimoDiscurso=ultimoDiscurso;
        vm.ultimoTipo=ultimoTipo;
        vm.selAlumno=selAlumno;
        
        //Lanzamiento automático
        activate();
        
        //Declaracion de funciones
        function activate(){
            getAlumnos(vm.data.id==1? 'hombre': undefined);
        }

        // Selecciona un alumno para enviarlo al controlador.
        function selAlumno(idx){
            console.log(vm.alumnos[idx]);
        }

        // Obtener todos los alumnos
        function getAlumnos(genero){
            vm.alumnos=[];
            if (!genero) genero='ambos';
            return EstudiantesFct.asignable({genero:genero},(data)=>{
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
                        vm.alumnos[i].asignaciones[j].updated_at = new Date(vm.alumnos[i].asignaciones[j].updated_at);
                        vm.alumnos[i].asignaciones[j].created_at = new Date(vm.alumnos[i].asignaciones[j].created_at);
                    }
                }
            });
        }
         function ok() {
            $uibModalInstance.close('Cerrado con OK');
        }
        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }
    }
    
})();