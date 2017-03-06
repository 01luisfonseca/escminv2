(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('AsignacionesController', ['EstudiantesFct','AsignacionesFct','DiscursosFct', '$uibModal', '$log', controller]);
    
    function controller(EstudiantesFct, AsignacionesFct, DiscursosFct, $uibModal, $log){
        var vm=this;
        
        //Variables
        vm.sel={
            sem:0,
            tabsala:'A',
            sala:[
                {
                    id:'A',
                    disc: [
                        {
                            id:1,
                            est:'',
                            acomp:'',
                            pto:''
                        },
                        {
                            id:2,
                            est:'',
                            acomp:'',
                            pto:''
                        },
                        {
                            id:3,
                            est:'',
                            acomp:'',
                            pto:''
                        },
                        {
                            id:4,
                            est:'',
                            acomp:'',
                            pto:''
                        },
                    ],
                },
                {
                    id:'B',
                    disc: [
                        {
                            id:1,
                            est:'',
                            acomp:'',
                            pto:''
                        },
                        {
                            id:2,
                            est:'',
                            acomp:'',
                            pto:''
                        },
                        {
                            id:3,
                            est:'',
                            acomp:'',
                            pto:''
                        },
                        {
                            id:4,
                            est:'',
                            acomp:'',
                            pto:''
                        },
                    ],
                }
            ],
        };
        vm.semanas={};

        //Funciones
        vm.tabSel= tabSel;
        vm.openModal=openModal; // Selecciona estudiante desde index de sala y de discurso.
        
        //Lanzamiento automático
        activate();
        
        //Declaracion de funciones
        function activate(){
            getSemanas();
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
        function getSemanas(){
            return DiscursosFct.query({},(data)=>{
                vm.semanas=getSem(data);
                vm.sel.sem=vm.semanas[0].week;
            })
        }
        function tabSel(tab){
            return tab==vm.sel.tabsala;
        }
        function openModal(idP, idC){
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
                        console.log(idP, idC);
                        return vm.sel.sala[idP].disc[idC];
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                console.log(selectedItem);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }
    
})()