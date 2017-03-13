(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('AsignacionesController', ['EstudiantesFct','AsignacionesFct','DiscursosFct', '$uibModal', '$log', '$window', controller]);
    
    function controller(EstudiantesFct, AsignacionesFct, DiscursosFct, $uibModal, $log, $window){
        var vm=this;
        
        //Variables
        vm.semanas={};
        vm.discursos=[];

        //Funciones
        vm.actSem=actSem;
        vm.hayPtoa=hayPtoa;
        vm.guardarInfo=guardarInfo;
        vm.tabSel= tabSel;
        vm.openModal=openModal; // Selecciona estudiante desde index de sala y de discurso.
        
        //Lanzamiento automático
        activate();
        
        //Declaracion de funciones
        function activate(){
            initObj();
            getSemanas();
        }
        function hayPtoa(idP, idC){
            if(vm.sel.sala[idP].disc[idC].ptoa!==0){
                return true;
            }
            return false;
        }
        function actSem(){
            var discSem=[];
            for (var i = 0; i < vm.discursos.length; i++) {
                if(vm.discursos[i].week===vm.sel.sem){
                    discSem.push({id:vm.discursos[i].id, alloc:parseInt(vm.discursos[i].alloc)});
                }
            }
            for (var i = 0; i < vm.sel.sala.length; i++) {
                for (var j = 0; j < vm.sel.sala[i].disc.length; j++) {
                    vm.sel.sala[i].disc[j].iddisc=discSem[j].id;
                }
            }
        }
        function getSem(arr){
            var tem=[];
            var acum=0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].week!=acum) {
                    acum=arr[i].week;
                    tem.push({week: arr[i].week});
                }
            }
            return tem;
        }
        function guardarInfo(){
            var msj=[];
            var err=false;
            console.log(vm.sel.sala);
            for (var i = 0; i < vm.sel.sala.length; i++) {
                for (var j = 0; j < vm.sel.sala[i].disc.length; j++) {
                    if (j>0) {
                        if (vm.sel.sala[i].disc[j].est==='' || vm.sel.sala[i].disc[j].acomp==='' || vm.sel.sala[i].disc[j].pto==='') {
                            err=true;
                            msj.push('Hace falta completar información en: SALA '+vm.sel.sala[i].id+', DISCURSO '+vm.sel.sala[i].disc[j].id);
                        }                     
                    }else{
                        if (vm.sel.sala[i].disc[j].est==='' || vm.sel.sala[i].disc[j].pto==='') {
                            err=true;
                            msj.push('Hace falta completar información en: SALA '+vm.sel.sala[i].id+', DISCURSO '+vm.sel.sala[i].disc[j].id);
                        }
                    }
                }
            }
            if (err) {
                $window.alert(msj); // Retorna los incompletos
                return 'error';
            }
            for (var i = 0; i < vm.sel.sala.length; i++) {
                for (var j = 0; j < vm.sel.sala[i].disc.length; j++) {
                    if (j>0) {
                        var asig=new AsignacionesFct();
                        asig.type= 'est'; 
                        asig.point= vm.sel.sala[i].disc[j].pto;
                        asig.room= vm.sel.sala[i].id;
                        asig.estudiantes_id= vm.sel.sala[i].disc[j].idest;
                        asig.discursos_id= vm.sel.sala[i].disc[j].iddisc;
                        asig.$save();
                        var aasig=new AsignacionesFct();
                        aasig.type= 'acomp'; 
                        aasig.point= vm.sel.sala[i].disc[j].pto;
                        aasig.room= vm.sel.sala[i].id;
                        aasig.estudiantes_id= vm.sel.sala[i].disc[j].idacomp;
                        aasig.discursos_id= vm.sel.sala[i].disc[j].iddisc;
                        aasig.$save();
                    }else{
                        var asig=new AsignacionesFct();
                        asig.type= 'est'; 
                        asig.point= vm.sel.sala[i].disc[j].pto;
                        asig.room= vm.sel.sala[i].id;
                        asig.estudiantes_id= vm.sel.sala[i].disc[j].idest;
                        asig.discursos_id= vm.sel.sala[i].disc[j].iddisc;
                        asig.$save();
                    }
                }                
            }
            initObj();
        }
        function getSemanas(){
            return DiscursosFct.query({},(data)=>{
                vm.discursos=data;
                vm.semanas=getSem(data);
                vm.sel.sem=vm.semanas[0].week;
                actSem();
            })
        }
        function tabSel(tab){
            return tab==vm.sel.tabsala;
        }
        function openModal(idP, idC, type){
            if(vm.sel.sala[idP].disc[idC][type]!=='') {
                if (type==='est') {
                    vm.sel.sala[idP].disc[idC].gen='ambos';
                    vm.sel.sala[idP].disc[idC].acomp='';
                }
                vm.sel.sala[idP].disc[idC][type]='';
                vm.sel.sala[idP].disc[idC]['id'+type]=0;
                return true;
            }
            if(type==='acomp'){
                if(vm.sel.sala[idP].disc[idC].est==='') return $window.alert('No se puede seleccionar acompañante si no ha elegido al estudiante.');
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modalasignacionest.html',
                controller: 'modalAsigEstCtrl',
                controllerAs: 'vm',
                size: 'lg',
                //appendTo: undefined,
                resolve: {
                    items: function () {
                        return {type: type, disc: vm.sel.sala[idP].disc[idC], all: vm.sel};
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                vm.sel.sala[idP].disc[idC][type]=selectedItem.name;
                vm.sel.sala[idP].disc[idC]['id'+type]=selectedItem.id;
                vm.sel.sala[idP].disc[idC].gen=selectedItem.sex;
                if (type==='est') {
                    vm.sel.sala[idP].disc[idC].ptoa=selectedItem.asignaciones.length? selectedItem.asignaciones[0].point: 0;
                }
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        function initObj(){
            vm.sel={
                sem:'',
                tabsala:'A',
                sala:[
                    {
                        id:'A',
                        disc: [
                            {
                                id:1,
                                iddisc:0,
                                idest:0,
                                idacomp:0,
                                est:'',
                                acomp:'',
                                pto:0,
                                ptoa:0,
                                gen:'hombre'
                            },
                            {
                                id:2,
                                iddisc:0,
                                idest:0,
                                idacomp:0,
                                est:'',
                                acomp:'',
                                pto:0,
                                ptoa:0,
                                gen:'ambos'
                            },
                            {
                                id:3,
                                iddisc:0,
                                idest:0,
                                idacomp:0,
                                est:'',
                                acomp:'',
                                pto:0,
                                ptoa:0,
                                gen:'ambos'
                            },
                            {
                                id:4,
                                iddisc:0,
                                idest:0,
                                idacomp:0,
                                est:'',
                                acomp:'',
                                pto:0,
                                ptoa:0,
                                gen:'ambos'
                            },
                        ],
                    },
                    {
                        id:'B',
                        disc: [
                            {
                                id:1,
                                iddisc:0,
                                idest:0,
                                idacomp:0,
                                est:'',
                                acomp:'',
                                pto:0,
                                ptoa:0,
                                gen:'hombre'
                            },
                            {
                                id:2,
                                iddisc:0,
                                idest:0,
                                idacomp:0,
                                est:'',
                                acomp:'',
                                pto:0,
                                ptoa:0,
                                gen:'ambos'
                            },
                            {
                                id:3,
                                iddisc:0,
                                idest:0,
                                idacomp:0,
                                est:'',
                                acomp:'',
                                pto:0,
                                ptoa:0,
                                gen:'ambos'
                            },
                            {
                                id:4,
                                iddisc:0,
                                idest:0,
                                idacomp:0,
                                est:'',
                                acomp:'',
                                pto:0,
                                ptoa:0,
                                gen:'ambos'
                            },
                        ],
                    }
                ],
            };
        }
    }
    
})();