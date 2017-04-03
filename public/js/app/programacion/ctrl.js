(function(){
	'use strict';
	angular.module('app.inicial')
    .controller('ProgramacionController', ['DiscursosFct', '$rootScope', controller]);
    
    function controller(DiscursosFct, $rootScope){
        var vm=this;
        
        //Variables
        let now=new Date();
        vm.discursos=[];
        vm.semanas=[];
        vm.sel={
            anio: now.getFullYear(),
            month: now.getMonth()+1,
        };

        //Funciones
        vm.anios=anios;
        vm.actmes=actmes;

        
        //Lanzamiento automático
        activate();
        
        //Declaracion de funciones
        function activate(){
        }
        function anios(){
            let date=new Date();
            let year=date.getFullYear();
            return [year-1,year,year+1];
        }
        function getSemanas(){
            return DiscursosFct.query({},(data)=>{
                vm.discursos=data;
                vm.semanas=getSem(data);
                vm.sel.sem=vm.semanas[0].week;
            })
        }
        function getSem(arr){
            var tem=[];
            var acum=0;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].week!=acum) {
                    acum=arr[i].week;
                    if(!arr[i].asignaciones.length){
                        tem.push({week: arr[i].week});
                    }
                }
            }
            return tem;
        }
        function actmes(){
            $rootScope.$broadcast('actmes',vm.sel);
        }
    }
    
})()