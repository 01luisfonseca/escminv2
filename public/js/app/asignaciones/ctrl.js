(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('AsignacionesController', ['EstudiantesFct','AsignacionesFct','DiscursosFct', '$uibModal', '$log', '$window','toastr', controller]);
    
    function controller(EstudiantesFct, AsignacionesFct, DiscursosFct, $uibModal, $log, $window,toastr){
        var vm=this;
        
        //Variables
        vm.semanas={};
        vm.discursos=[];

        //Funciones
        vm.limpiaDisc=limpiaDisc;
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
        function hayPtoa(idP, idC){
            if(vm.sel.sala[idP].disc[idC].ptoa!==0){
                return true;
            }
            return false;
        }
        function actSem(){
            var discSem=[];
            //initObj();
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
                    if(!arr[i].asignaciones.length){
                        tem.push({week: arr[i].week});
                    }
                }
            }
            return tem;
        }
        function guardarInfo(){
            var msj=[];
            var err=false;
            for (var i = 0; i < vm.sel.sala.length; i++) {
                for (var j = 0; j < vm.sel.sala[i].disc.length; j++) {
                    if (vm.sel.sala[i].disc[j].ayuda) {
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
                if(!$window.confirm('Desea almacenar los registros de todas formas?')) return 'error';
            }
            var elementosToSalvar=[];
            for (var i = 0; i < vm.sel.sala.length; i++) {
                for (var j = 0; j < vm.sel.sala[i].disc.length; j++) {
                    if(vm.sel.sala[i].disc[j].idest!==0){
                        elementosToSalvar.push({
                            type: 'est', 
                            point: vm.sel.sala[i].disc[j].pto,
                            room: vm.sel.sala[i].id,
                            estudiantes_id: vm.sel.sala[i].disc[j].idest,
                            discursos_id: vm.sel.sala[i].disc[j].iddisc,
                        });
                        if (vm.sel.sala[i].disc[j].ayuda) {
                            elementosToSalvar.push({
                                type: 'acomp', 
                                point: vm.sel.sala[i].disc[j].pto,
                                room: vm.sel.sala[i].id,
                                estudiantes_id: vm.sel.sala[i].disc[j].idacomp,
                                discursos_id: vm.sel.sala[i].disc[j].iddisc,
                            });
                        }
                    }
                }                
            }
            if (elementosToSalvar.length==0) return $window.alert('No se puede guardar nada si no ha seleccionado al menos un alumno.');
            //console.log(elementosToSalvar);
            almacenarAsignaciones(elementosToSalvar).then(
                (dt)=>{
                    activate();                    
                    console.log('Asignaciones almacenadas');
                },
                (e)=>{
                    console.error(e);
                }
            );
        }
        function almacenarAsignaciones(arr){
            if(!arr.length) return false;
            let promise= new Promise((res, rej)=>{
                console.log(arr);
                var asig=new AsignacionesFct();
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
                            activate();                    
                            console.log('Asignaciones almacenadas');
                            $window.alert('Asignaciones almacenadas');
                            res(dt);
                        }
                    },
                    (e)=>{
                        console.error(e);
                        rej(e);
                    }
                );
            });
            return promise;
        }
        function getSemanas(){
            return DiscursosFct.query({},(data)=>{
                vm.discursos=data;
                vm.semanas=getSem(data);
                vm.sel.sem=vm.semanas[0].week;
                actSem();
            },()=>{
                toastr.error('No se han podido obtener los datos.');
            })
        }
        function tabSel(tab){
            return tab==vm.sel.tabsala;
        }
        function openModal(idP, idC, type){
            if(vm.sel.sala[idP].disc[idC][type]!=='') {
                if (type==='est') {
                    vm.sel.sala[idP].disc[idC].gen=vm.sel.sala[idP].disc[idC].ayuda? 'ambos' : 'hombre';
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
                vm.sel.sala[idP].disc[idC].pto=selectedItem.asignaciones.length>0?(selectedItem.asignaciones[0].futurepoint?selectedItem.asignaciones[0].futurepoint:0):0;
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
                                gen:'hombre',
                                ayuda:false
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
                                gen:'ambos',
                                ayuda:true
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
                                gen:'ambos',
                                ayuda:true
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
                                gen:'ambos',
                                ayuda:true
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
                                gen:'hombre',
                                ayuda:false
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
                                gen:'ambos',
                                ayuda:true
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
                                gen:'ambos',
                                ayuda:true
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
                                gen:'ambos',
                                ayuda:true
                            },
                        ],
                    }
                ],
            };
        }
    }
    
})();