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
        // Devuelve el texto de ultimoTipo
        function ultimoTipo(id){
            for (var i = 0; i < vm.alumnos.length; i++) {
                if (vm.alumnos[i].id==id) {
                    if (vm.alumnos[i].asignaciones.length) {
                        vm.alumnos[i].asignaciones.sort(function(a,b){
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(b.updated_at) - new Date(a.updated_at);
                        });
                        return vm.alumnos[i].asignaciones[0].type;
                    }else{
                        return 'No tiene.';
                    }
                }
            }
        }

        // Devuelve el texto de ultimoDiscurso
        function ultimoDiscurso(id){
            for (var i = 0; i < vm.alumnos.length; i++) {
                if (vm.alumnos[i].id==id) {
                    if (vm.alumnos[i].asignaciones.length) {
                        vm.alumnos[i].asignaciones.sort(function(a,b){
                            // Turn your strings into dates, and then subtract them
                            // to get a value that is either negative, positive, or zero.
                            return new Date(b.updated_at) - new Date(a.updated_at);
                        });
                        return vm.alumnos[i].asignaciones[0].updated_at;
                    }else{
                        return 'No tiene.';
                    }
                }
            }
        }

        // Obtener todos los alumnos
        function getAlumnos(genero){
            vm.alumnos=[];
            if (!genero) genero='ambos';
            return EstudiantesFct.asignable({genero:genero},(data)=>{
                vm.alumnos=data;
            })
        }
         function ok() {
            $uibModalInstance.close('Cerrado con OK');
        }
        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }
    }
    
})();