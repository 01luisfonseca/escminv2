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

    	function controller(EstudiantesFct, $window, $log){
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
					data.$save();
					inicializador();
					$window.alert('Se ha creado el alumno.');
				}else{
					EstudiantesFct.update({id:vm.existente}, vm.data);
				}
			}			

    	}
	}
})();