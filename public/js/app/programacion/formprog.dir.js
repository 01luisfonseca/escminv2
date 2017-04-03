(function(){
	'use strict';
	angular
		.module('app.inicial')
		.directive('formProg',directive);

	function directive(){
		var directive = {
        	link: link,
        	templateUrl: 'js/app/programacion/formprog.dir.html',
        	restrict: 'EA',
        	scope:{
        	},
        	controller: controller,
        	controllerAs: 'vm',
        	bindToController: true // because the scope is isolated
    	};
    	return directive;

		// Funciones
		function link(scope, element, attrs) {
    	}

    	function controller(EstudiantesFct, $window, $log, $scope){
    		var vm=this;

			// Variables
			
			// Funciones externas
			
			// Lanzamiento Automático
			$scope.$on('actmes',function(ev,args){
				vm.mes=args;
				activate();
			});
			activate();

			/////////////////////////// FUNCIONES INTERNAS //////////////////////////////
			function activate(){
    			console.log(vm.mes);
			}
			function inicializador(){
				// Var init
			}

			/////////////////////////// FUNCIONES EXTERNAS //////////////////////////////		

    	}
	}
})();