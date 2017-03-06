(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('EstudiantesController', ['EstudiantesFct', '$log', '$window', '$scope', '$uibModal', controller]);
    
    function controller(EstudiantesFct, $log, $window, $scope, $uibModal){
        var vm=this;
        
        //Variables
        vm.datas={};
        vm.sel={
            tab:1
        }
        
        //Funciones
        vm.selTab=selTab;
        vm.tabSel=tabSel;
        vm.delData=delData;
        vm.openModal=openModal;
        
        //Lanzamiento automático
        
        //Declaracion de funciones
        function selTab(tb){
            vm.sel.tab=tb;
            getDatas();
        }
        function tabSel(tb){
            return vm.sel.tab===tb;
        }
        function getDatas(){
            return EstudiantesFct.query({},(data)=>{
                vm.datas=data;
            })
        }
        function delData(id){
            if (!$window.confirm('Está seguro que desea borrar el usuario?')) {
                return false;
            }
            return EstudiantesFct.delete({id:id},(info)=>{
                getDatas();
                $window.alert('Se ha borrado el usuario.');
            });
        }
        function openModal(id){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'modalestudiante.html',
                controller: 'modalEstudiantesCtrl',
                controllerAs: 'vm',
                size: 'lg',
                //appendTo: undefined,
                resolve: {
                    items: function () {
                        return vm.datas[id];
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                getDatas();
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                getDatas();
            });
        }
    }
    
})()