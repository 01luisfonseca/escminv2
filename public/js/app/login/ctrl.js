(function(){
	'use strict';
	angular
		.module('app.inicial')
		.controller('loginCtrl',['$location', '$localStorage', 'AuthFactory', '$window','$timeout','toastr',controller]);

		function controller($location, $localStorage, AuthFactory, $window, $timeout, toastr){
			var vm=this;
			vm.login={
				username:'',
				password:'',
			};
			
			// Funciones
			vm.loginUser=loginUser;
			vm.logoutUser=logoutUser;

			// Lanzamiento automático
			vm.logoutUser();
			
			///////////////
			function loginUser(){
				console.log('Iniciando sesión...');
				vm.loading=true;
				AuthFactory.Login(vm.login, respuesta);
			}

			function respuesta(result){
                if (result === true) {
					toastr.success('Sesión iniciada. Entrando al sistema.');
					$timeout(function(){
						$location.path('/inicial');
                    	console.log('Sesión iniciada.');
					},1000);
                } else {
                    vm.error = 'Usuario o contraseña incorrectos';
                    vm.loading = false;
					toastr.error(vm.error);
                    //$window.alert(vm.error);
                }
			}

			function logoutUser(){
				console.log('Sesión cerrada.');
				AuthFactory.Logout();
			}
		}
})();