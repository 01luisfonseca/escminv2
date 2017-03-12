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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('estudiantes', 'EstudiantesCtrl');
Route::get('estudiantes/asignables/{genero}/{tipo}', 'EstudiantesCtrl@asignables');

Route::resource('asignaciones', 'AsignacionesCtrl');
Route::resource('discursos', 'DiscursosCtrl');

// Rutas especiales

