(function(){

    /*

        El modal es quien filtra la información de los estudiantes para que se muestre según la necesidad, según la
        presentación

    */


	'use strict';

	angular.module('app.inicial')
    .controller('modalAsigDiscCtrl', controller);
    
    function controller(AsignacionesFct, $uibModalInstance, items, $window, $q, $uibModal,$log,toastr){
        var vm=this;
        
        //Variables
        vm.data = items;
        vm.alumnos=[];
        vm.sala={
            room:vm.data.sala,
            id:Number(vm.data.numDisc),
            week: vm.data.week,
            iddisc: vm.data.id,
            idAsigEst:0,
            idest:0,
            idAsigAcomp:0,
            idacomp:0,
            est:'',
            acomp:'',
            pto:0,
            gen:vm.data.numDisc==1?'hombre':'ambos',
            ptoa:0,
            ayuda:vm.data.asign.length>2?true:false
        };

        //Funciones
        vm.ok=ok;
        vm.cancel=cancel;
        vm.openModal=openModal;
        vm.limpiaDisc=limpiaDisc;
        vm.guardarInfo=guardarInfo;
        vm.deleteInfo=deleteInfo;
        
        //Lanzamiento automático
        activate();
        
        //Declaracion de funciones
        function deleteInfo(){}
        function guardarInfo(){
            var elementosToSalvar=[];
            elementosToSalvar.push({
                idAsig:vm.sala.idAsigEst,
                type: 'est', 
                point: vm.sala.pto,
                room: vm.sala.room,
                estudiantes_id: vm.sala.idest,
                discursos_id: vm.sala.iddisc,
            });
            if (vm.sala.ayuda) {
                elementosToSalvar.push({
                    idAsig: vm.sala.idAsigAcomp,
                    type: 'acomp', 
                    point: vm.sala.pto,
                    room: vm.sala.room,
                    estudiantes_id: vm.sala.idacomp,
                    discursos_id: vm.sala.iddisc,
                });
            }
            (function almacenarAsignaciones(arr){
                if(!arr.length) return false;
                if(!arr[0].idAsig || arr[0].idAsig == 0){
                    let asig=new AsignacionesFct();
                    asig.type= arr[0].type; 
                    asig.point= arr[0].point;
                    asig.room= arr[0].room;
                    asig.estudiantes_id= arr[0].estudiantes_id;
                    asig.discursos_id= arr[0].discursos_id;
                    asig.$save().then(
                        (dt)=>{
                            arr.shift();
                            if(arr.length>0){
                                return almacenarAsignaciones(arr);
                            }else{                   
                                toastr.success('Asignaciones almacenadas');
                                vm.ok(true);
                                return true;
                            }
                        },
                        (e)=>{
                            console.error(e);
                            toastr.error('Error de almacenamiento.');                            
                            toastr.error(e);
                            return false;          
                        }
                    );
                }else{
                    let data={
                        type: arr[0].type, 
                        point: arr[0].point,
                        room: arr[0].room,
                        estudiantes_id: arr[0].estudiantes_id,
                        discursos_id: arr[0].discursos_id,
                        id: arr[0].idAsig,
                    }
                    AsignacionesFct.update({id:data.id}, data).$promise.then(
                        (dt)=>{
                            arr.shift();
                            if(arr.length>0){
                                return almacenarAsignaciones(arr);
                            }else{                   
                                toastr.success('Asignaciones actualizadas');
                                vm.ok(true);
                                return true;
                            }
                        },
                        (e)=>{
                            console.error(e);
                            toastr.error('Error de actualización.');                            
                            toastr.error(e);
                            return false;
                        }
                    );
                }
            })(elementosToSalvar);
        }
        function limpiaDisc(disc){
            disc.idest=0;
            disc.idacomp=0;
            disc.est='';
            disc.acomp='';
            disc.pto=0;
            disc.ptoa=0;
            if(disc.ayuda){
                disc.gen='ambos'; // Si hay ayudante
            }else{
                disc.gen='hombre'; // Si no hay ayudante
            }
        }
        function openModal(type){
            console.log('Entramos a modal');
            if(vm.sala[type]!=='') {
                // Limpiar el campo.
                if (type==='est') {
                    vm.sala.gen=vm.sala.ayuda? 'ambos' : 'hombre';
                    vm.sala.acomp='';
                    vm.sala.idacomp=0;
                }
                vm.sala[type]='';
                vm.sala['id'+type]=0;
                return true;
            }
            if(type==='acomp'){
                if(vm.sala.est==='') return $window.alert('No se puede seleccionar acompañante si no ha elegido al estudiante.');
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modalasignacionest.html',
                controller: 'modalAsigManEstCtrl',
                controllerAs: 'vm',
                size: 'lg',
                //appendTo: undefined,
                resolve: {
                    items: function () {
                        return {type: type, gen: vm.sala.gen};
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                vm.sala[type]=selectedItem.name;
                vm.sala['id'+type]=selectedItem.id;
                vm.sala.gen=selectedItem.sex;
                vm.sala.pto=selectedItem.asignaciones.length>0?(selectedItem.asignaciones[0].futurepoint?selectedItem.asignaciones[0].futurepoint:0):0;
                if (type==='est') {
                    vm.sala.ptoa=selectedItem.asignaciones.length? selectedItem.asignaciones[0].point: 0;
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        function creaDiscModel(){
            if(vm.data.asign.length>0){
                for (var i = 0; i < vm.data.asign.length; i++) {
                    var asign = vm.data.asign[i];
                    if (asign.room===vm.data.sala) {
                        if (asign.type=='est') {
                            vm.sala.idAsigEst=asign.id;
                            vm.sala.idest=asign.estudiantes_id;
                            vm.sala.est=asign.estudiantes.name;
                            vm.sala.pto=asign.point;
                        } else {
                            vm.sala.idAsigAcomp=asign.id;
                            vm.sala.idacomp=asign.estudiantes_id;
                            vm.sala.acomp=asign.estudiantes.name;
                        }
                    }
                }
            }
        }
        function activate(){
            creaDiscModel();
        }
         function ok(sel) {
            $uibModalInstance.close(sel);
        }
        function cancel () {
            $uibModalInstance.dismiss('cancel');
        }
    }
    
})();