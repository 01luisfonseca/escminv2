<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['middleware'=>['auth'],'throttle:150'],function (){
    Route::middleware('auth:api')->get('/user', function (Request $request) {
        return $request->user();
    });

    Route::resource('estudiantes', 'EstudiantesCtrl');
    Route::get('estudiantes/asignables/{genero}/{tipo}', 'EstudiantesCtrl@asignables');

    Route::resource('asignaciones', 'AsignacionesCtrl');
    Route::post('asignaciones/{id}/{pto}', 'AsignacionesCtrl@futurepoint');
    
    Route::resource('discursos', 'DiscursosCtrl');
    Route::get('discursos/mes/{anio}/{mes}', 'DiscursosCtrl@mensual');
    

    // Rutas especiales
});

