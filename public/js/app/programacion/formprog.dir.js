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

    	function controller(DiscursosFct, AsignacionesFct, $window, $log, $scope,toastr){
    		var vm=this;

			// Variables
			vm.mes={};
			vm.disc=[];
			vm.puntoprox=[];
			
			// Funciones externas
			vm.getNameMes=getNameMes;
			vm.mesSeleccionado=mesSeleccionado;
			vm.discursantes=discursantes;
			vm.buscarPto=buscarPto;
			vm.estProx=estProx;
			vm.imprimir=imprimir;
			vm.guardar=guardar;
			vm.textoFecha= textoFecha;
			
			// Lanzamiento Automático
			$scope.$on('actmes',function(ev,args){
				vm.mes=args;
				activate();
			});

			/////////////////////////// FUNCIONES INTERNAS //////////////////////////////
			function activate(){
				getSemanas(vm.mes);// Obtener datos de objeto con anio y month
			}
			function inicializador(){
				// Var init
			}

			/**
			 * Obtiene los datos según el mes y el año
			 * 
			 * @param {anio:'',mes:''} obj 
			 * @returns 
			 */
			function getSemanas(obj){
				vm.puntoprox=[];
				vm.disc=[];
				return DiscursosFct.mes({mes:obj.month, anio:obj.anio},(data)=>{
					vm.disc=ajustarData(data);
					//console.log(vm.disc);
				});
				/////
				function ajustarData(dt){
					let temp=[];
					for (var i = 0; i < dt.length; i += 4) {
						temp.push(
							{
								week: dt[i].week,
								discursos:[dt[i],dt[i+1],dt[i+2],dt[i+3]] // Siempre son 4 discursos
							}
						);
					}
					return temp;
				}
			}

			/**
			 * Se encarga de verificar si es una asignacion que ya se le modificó el punto a trabajar futuro, o si es nueva.
			 * Es la cola de acciones a almacenar para punto futuro.
			 * 
			 * @param {any} pto 
			 * @param {any} est 
			 */
			function asignaProx(pto,est){
				for (var i = 0; i < vm.puntoprox.length; i++) {
					for (var j = 0; j < est.length; j++) {
						if(est[j].id===vm.puntoprox[i].id){
							est[j].existe=true;
							vm.puntoprox[i].futurepoint=pto;
						}
					}					
				}
				for (var i = 0; i < est.length; i++) {
					est[i].futurepoint=pto;
					if(!est[i].existe) vm.puntoprox.push(est[i]);
				}
			}

			/////////////////////////// FUNCIONES EXTERNAS //////////////////////////////		
			function textoFecha(fecha){
				let myFecha=new Date(fecha);
				let lafecha='';
				lafecha += myFecha.getUTCDate()+' DE ';
				switch (myFecha.getMonth()) {
					case 0:
						lafecha +='ENERO';
						break;
					case 1:
						lafecha +='FEBRERO';
						break;
					case 2:
						lafecha +='MARZO';
						break;
					case 3:
						lafecha +='ABRIL';
						break;
					case 4:
						lafecha +='MAYO';
						break;
					case 5:
						lafecha +='JUNIO';
						break;
					case 6:
						lafecha +='JULIO';
						break;
					case 7:
						lafecha +='AGOSTO';
						break;
					case 8:
						lafecha +='SEPTIEMBRE';
						break;
					case 9:
						lafecha +='OCTUBRE';
						break;
					case 10:
						lafecha +='NOVIEMBRE';
						break;
					case 11:
						lafecha +='DICIEMBRE';
						break;
				}
				return lafecha;
			}
			function guardar(){
				return AsignacionesFct.proxpoint({id : vm.puntoprox[0].id, pto : vm.puntoprox[0].futurepoint},(data)=>{
					vm.puntoprox.shift();
					if(vm.puntoprox.length > 0){
						return guardar();
					}else{
						toastr.success('Se han almacenado todos los datos');
						activate();
						return true;
					}
				},()=>{
					toastr.error('No se han podido guardar los datos.');
				});
			}
			/**
			 * Imprime según un DIV
			 * 
			 */
			function imprimir(){
				printDiv('imprimeProg','Programa');
				//////
				function printDiv(DivID, Tit) {
					var styles=`
					<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
					<link rel="stylesheet" type="text/css" href="css/app.css">
					<link rel="stylesheet" type="text/css" href="assets/css/template.css">
					<link rel="stylesheet" type="text/css" href="assets/js/uibootstrap/dist/ui-bootstrap-csp.css">
					<link rel="stylesheet" type="text/css" href="css/animations.css">
					`;
					var disp_setting = "toolbar=no,location=no,";
					disp_setting += "directories=no,menubar=no,";
					disp_setting += "scrollbars=yes,width=850, height=600, left=100, top=25";
					var content_vlue = document.getElementById(DivID).innerHTML;
					var docprint = window.open("", "", disp_setting);
					docprint.document.open();
					docprint.document.write('<!DOCTYPE html>');
					docprint.document.write('<html>');
					docprint.document.write('<head>');
					docprint.document.write('<meta charset="utf-8" />');
					docprint.document.write('<title>' + Tit + '</title>');
					docprint.document.write('<meta http-equiv="X-UA-Compatible" content="IE=edge">');
					docprint.document.write('<meta content="width=device-width, initial-scale=1" name="viewport" />');
					docprint.document.write(styles);
					docprint.document.write('</head>');
					docprint.document.write('<body onLoad="self.print(); self.close();">');
					docprint.document.write(content_vlue);
					docprint.document.write('</body></html>');
					docprint.document.close();
					docprint.focus();
      			}			
			}
			/**
			 * Recibe el evento del input, busca el valor del input y selecciona las asignaciones asociadas para poner el futurepoint
			 * 
			 * @param {any} e 
			 * @param {any} sala 
			 * @param {any} discursantes 
			 * @returns Valor sin importancia
			 */
			function estProx(e, sala, discursantes){
				let res=[]
				for (var i = 0; i < discursantes.length; i++) {
					if(discursantes[i].room===sala) res.push(discursantes[i]);				
				}
				// Toma el val del input y lo asigna a los registros encontrados
				asignaProx(parseInt(angular.element(e.target).val()),JSON.parse(JSON.stringify(res))); 
				return true;
			}

			/**
			 * Busca el punto y el punto futuro de una serie de asignaciones entregadas
			 * 
			 * @param {any} tipo 'pto' o 'prox'
			 * @param {any} sala 'A' o 'B'
			 * @param {any} discursantes 
			 * @returns No del punto o 0
			 */
			function buscarPto(tipo, sala, discursantes){
				for (var i = 0; i < discursantes.length; i++) {
					if(discursantes[i].room===sala){
						if(tipo=='pto'){
							return discursantes[i].point;
						}else{
							return discursantes[i].futurepoint;
						}
					}					
				}
				return 0;
			}

			/**
			 * Busca los discursantes de la sala. Devuelve solo los que cumplen
			 * 
			 * @param {any} sala 
			 * @param {any} discursantes 
			 * @returns array discursantes
			 */
			function discursantes(sala, discursantes){
				let res=[];
				for (var i = 0; i < discursantes.length; i++) {
					if(discursantes[i].room===sala) res.push(discursantes[i]);					
				}
				return res;
			}

			/**
			 * Devuelve el nombre del mes según el mes enviado
			 * 
			 * @returns string MES
			 */
			function getNameMes(){
				if (typeof vm.mes.month !== 'undefined') {
					switch (parseInt(vm.mes.month)) {
						case 1:
							return 'ENERO';
							break;
					
						case 2:
							return 'FEBRERO';
							break;
					
						case 3:
							return 'MARZO';
							break;
					
						case 4:
							return 'ABRIL';
							break;
					
						case 5:
							return 'MAYO';
							break;
					
						case 6:
							return 'JUNIO';
							break;
					
						case 7:
							return 'JULIO';
							break;
					
						case 8:
							return 'AGOSTO';
							break;
					
						case 9:
							return 'SEPTIEMBRE';
							break;
					
						case 10:
							return 'OCTUBRE';
							break;
					
						case 11:
							return 'NOVIEMBRE';
							break;
					
						case 12:
							return 'DICIEMBRE';
							break;
					
						default:
							break;
					}
				}
				return '';
			}

			/**
			 * Busca el número del mes para darle Nombre
			 * 
			 * @returns 
			 */
			function mesSeleccionado(){
				if (typeof vm.mes.month !== 'undefined') return false;
				return true;
			}
    	}
	}
})();