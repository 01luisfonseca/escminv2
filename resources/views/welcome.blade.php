<!DOCTYPE html>
<html lang='es'>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="autor" content="">
        <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/app.css">
        <link rel="stylesheet" type="text/css" href="assets/css/template.css">
        <link rel="stylesheet" type="text/css" href="assets/css/angular-busy.css">
        <link rel="stylesheet" type="text/css" href="assets/css/angular-toastr.css">
        <link rel="stylesheet" type="text/css" href="assets/js/uibootstrap/dist/ui-bootstrap-csp.css">
        <link rel="stylesheet" type="text/css" href="css/animations.css">
        <title>Escuela Ministerio</title>

        <!-- JS Assets -->
        <script type="text/javascript" src="assets/js/jquery.min.js"></script>
        <script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="assets/js/angular.min.js"></script>
        <script type="text/javascript" src="assets/js/angular-animate.min.js"></script>
        <script type="text/javascript" src="assets/js/angular-busy.js"></script>
        <script type="text/javascript" src="assets/js/angular-toastr.tpls.js"></script>
        <script type="text/javascript" src="assets/js/angular-resource.min.js"></script>
        <script type="text/javascript" src="assets/js/angular-route.min.js"></script>
        <script type="text/javascript" src="assets/js/ngStorage.min.js"></script>
        <script type="text/javascript" src="assets/js/uibootstrap/dist/ui-bootstrap.js"></script>
        <script type="text/javascript" src="assets/js/uibootstrap/dist/ui-bootstrap-tpls.js"></script>

        <!-- JS Modules -->
        <script type="text/javascript" src="js/app/core/app.js"></script>
        <script type="text/javascript" src="js/app/core/app.config.js"></script>
        <script type="text/javascript" src="js/app/core/app.core.js"></script>
        <script type="text/javascript" src="js/app/core/app.services.js"></script>
        <script type="text/javascript" src="js/app/core/app.inicial.js"></script>
        
        <!-- JS App.Services -->
        <script type="text/javascript" src="js/app/services/user.fact.js"></script>
        <script type="text/javascript" src="js/app/services/perfil.fact.js"></script>
        <script type="text/javascript" src="js/app/services/estudiantes.fact.js"></script>
        <script type="text/javascript" src="js/app/services/asignaciones.fact.js"></script>
        <script type="text/javascript" src="js/app/services/discursos.fact.js"></script>
        <script type="text/javascript" src="js/app/services/auth.fact.js"></script>
        <script type="text/javascript" src="js/app/services/motos.fact.js"></script>

        <!-- JS App.Inicial -->
        <script type="text/javascript" src="js/app/inicial/ctrl.js"></script>
        <script type="text/javascript" src="js/app/inicial/especifico.ctrl.js"></script>
        <script type="text/javascript" src="js/app/estudiantes/ctrl.js"></script>
        <script type="text/javascript" src="js/app/estudiantes/modal.ctrl.js"></script>
        <script type="text/javascript" src="js/app/discursos/ctrl.js"></script>
        <script type="text/javascript" src="js/app/estudiante/ctrl.js"></script>
        <script type="text/javascript" src="js/app/estudiante/dir.js"></script>
        <script type="text/javascript" src="js/app/asignaciones/ctrl.js"></script>
        <script type="text/javascript" src="js/app/asignaciones/modal.ctrl.js"></script>
        <script type="text/javascript" src="js/app/programacion/ctrl.js"></script>
        <script type="text/javascript" src="js/app/programacion/formprog.dir.js"></script>
        <script type="text/javascript" src="js/app/menu/dir.js"></script>
        <script type="text/javascript" src="js/app/login/ctrl.js"></script>
        <script type="text/javascript" src="js/app/miinfo/ctrl.js"></script>
        <script type="text/javascript" src="js/app/users/ctrl.js"></script>

    </head>
    <body ng-app='app'>

        <div class="container-fuid">
            <div ng-view>
            </div>
        </div>

        <script type="text/javascript">
        </script>

    </body>
</html>