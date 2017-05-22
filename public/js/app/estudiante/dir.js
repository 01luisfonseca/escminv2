(function(){
	'use strict';
	angular
		.module('app.inicial')
		.directive('lfFormestudiante',directive);

	function directive(){
		var directive = {
        	link: link,
        	templateUrl: 'js/app/estudiante/dir.html',
        	restrict: 'EA',
        	scope:{
        		'existente':'=',
        	},
        	controller: controller,
        	controllerAs: 'vm',
        	bindToController: true // because the scope is isolated
    	};
    	return directive;

		// Funciones
		function link(scope, element, attrs) {
      		/* */
    	}

    	function controller(EstudiantesFct, $window, $log, toastr){
    		var vm=this;
    		//console.log(vm.existente);

			// Variables
			vm.textSubmit='Guardar';
			vm.data={};
			
			// Funciones externas
			vm.almacenar=almacenar;
			

			// Lanzamiento Automático
			activate();

			/////////////////////////// FUNCIONES INTERNAS //////////////////////////////
			function activate(){
				$log.debug();
				if (typeof(vm.existente)=='undefined'){
					inicializador();
				}else{
					vm.textSubmit= 'Actualizar';
					gData();
					$log.info(vm.existente);
				}
			}
			function inicializador(){
				vm.data={
					name:'',
					sex:'hombre',
					estado:true
				};
			}
			function gData(){
				vm.data= EstudiantesFct.get({id:vm.existente},()=>{
					$log.debug(arguments);
				});
				vm.data.estado= vm.data.estado ==1? true: false;
				return true;
			}

			/////////////////////////// FUNCIONES EXTERNAS //////////////////////////////
			function almacenar(){
				if (typeof(vm.existente)=='undefined') {
					let data= new EstudiantesFct();
					data=Object.assign(data,vm.data);
					data.$save(()=>{
						toastr.success('Se ha creado el alumno.');
					},()=>{
						toastr.error('No se ha creado el alumno.');
					});
					inicializador();
					//$window.alert('Se ha creado el alumno.');
				}else{
					EstudiantesFct.update({id:vm.existente}, vm.data,()=>{
						toastr.success('Se ha actualizado el registro.');												
					},()=>{
						toastr.error('No se ha actualizado el registro.');						
					});
				}
			}			

    	}
	}
})();