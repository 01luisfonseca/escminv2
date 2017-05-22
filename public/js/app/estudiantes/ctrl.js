(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('EstudiantesController', ['EstudiantesFct', '$log', '$window', '$scope', '$uibModal','toastr','$q', controller]);
    
    function controller(EstudiantesFct, $log, $window, $scope, $uibModal,toastr,$q){
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
            vm.cargando=$q.defer();
            return EstudiantesFct.query({},(data)=>{
                vm.cargando.resolve();
                vm.datas=data;
            },()=>{
                vm.cargando.reject();
                toastr.error('No se han podido obtener los datos.');
            })
        }
        function delData(id){
            if (!$window.confirm('Está seguro que desea borrar el usuario?')) {
                return false;
            }
            return EstudiantesFct.delete({id:id},(info)=>{
                getDatas();
                toastr.warning('Se ha borrado el usuario.')
                //$window.alert('Se ha borrado el usuario.');
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