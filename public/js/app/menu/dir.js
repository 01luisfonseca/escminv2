(function(){
	'use strict';
	angular
		.module('app.inicial')
		.directive('menu',directive);

	function directive(){
		var directive = {
        	link: link,
        	templateUrl: 'js/app/menu/dir.html',
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

    	function controller($window, $log, $scope, AuthFactory){
    		var vm=this;

			// Variables
			
			// Funciones externas
			
			// Lanzamiento Automático
            activate();

			/////////////////////////// FUNCIONES INTERNAS //////////////////////////////

            /**
             * Funcion de lanzamiento automático al cargar
             * 
             */
            function activate(){
                 $('.navbar-toggler').on('click', function(event) {
					event.preventDefault();
					$(this).closest('.navbar-minimal').toggleClass('open');
				});
            }

			/////////////////////////// FUNCIONES EXTERNAS //////////////////////////////		

    	}
	}
})();