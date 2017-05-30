(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('DiscursosController', ['DiscursosFct','$q','$uibModal','$log', controller]);
    
    function controller(DiscursosFct,$q,$uibModal,$log){
        var vm=this;
        
        //Variables
        vm.datas={};

        //Funciones
        vm.openModal=openModal;
        vm.calcularTxt=calcularTxt;
        
        //Lanzamiento automático
        activate();
        
        //Declaracion de funciones
        function calcularTxt(dt,sala,type){
            if (typeof(type)!=='undefined') {
                //console.log(dt);                
                for (var i = 0; i < dt.asignaciones.length; i++) {
                    let asig = dt.asignaciones[i];
                    if (asig.room==sala) {
                        if (asig.type==type) return asig.estudiantes.name;
                    }
                }
                return 'Libre';
            } else {
                for (var i = 0; i < dt.asignaciones.length; i++) {
                    let asig = dt.asignaciones[i];
                    if (asig.room==sala) return asig.point;
                }
                return '';
            }
        }
        function activate(){
            getDatas();
        }
        function getDatas(){
            vm.cargando=$q.defer();
            return DiscursosFct.query({},(data)=>{
                vm.cargando.resolve();
                vm.datas=data;
            })
        }
        function openModal(sala,numDisc,week,asign,id){
            let elems={sala,numDisc,week,asign,id};
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modalasignaciondisc.html',
                controller: 'modalAsigDiscCtrl',
                controllerAs: 'vm',
                size: 'lg',
                //appendTo: undefined,
                resolve: {
                    items: function () {
                        return elems;
                    }
                }
            });
            modalInstance.result.then(function (dt) {
                console.log(dt);
                activate();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }
    
})()