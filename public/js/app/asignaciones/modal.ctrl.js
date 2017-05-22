(function(){

    /*

        El modal es quien filtra la información de los estudiantes para que se muestre según la necesidad, según la
        presentación

    */


	'use strict';

	angular.module('app.inicial')
    .controller('modalAsigEstCtrl', controller);
    
    function controller(EstudiantesFct, $uibModalInstance, items, $window, $q){
        var vm=this;
        
        //Variables
        vm.data = items;
        vm.alumnos=[];
        //console.log(items);

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
            vm.cargandoModal=$q.defer();
            EstudiantesFct.asignable({genero:genero, tipo:tipo},(data)=>{
                vm.cargandoModal.resolve();
                vm.alumnos=data;
                vm.alumnos.sort((a,b)=>{
                    if(a.name>b.name) return 1;
                    return -1;
                });
                vm.alumnos.sort((a,b)=>{
                    if(!a.asignaciones) return -1;
                    if(a.asignaciones.length==0) return -1;
                    if(!b.asignaciones) return 1;
                    if(b.asignaciones.length==0) return 1;
                    if(a.asignaciones[0].week>b.asignaciones[0].week) return 1;
                    return -1;
                });
                var acum=[];
                // Para filtrar los alumnos que ya están seleccionados en la actual carga
                for (var i = 0; i < vm.data.all.sala.length; i++) {
                    for (var j = 0; j < vm.data.all.sala[i].disc.length; j++) {
                        try{
                        for (var k = 0; k < vm.alumnos.length; k++) {
                            if(vm.data.all.sala[i].disc[j].idest==vm.alumnos[k].id || vm.data.all.sala[i].disc[j].idacomp==vm.alumnos[k].id){
                                vm.alumnos.splice(k,1);
                            }                            
                        }
                        }catch(e){}
                    }
                    vm.data.all.sala[i]
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