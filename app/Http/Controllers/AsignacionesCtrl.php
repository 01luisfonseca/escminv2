<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Asignaciones;
use App\Estudiantes;
use App\Discursos;
use Carbon\Carbon;
use App\Http\Helpers\AutoDiscursos;
use Log;

class AsignacionesCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $var=new AutoDiscursos;
        $var->complete();
        $obj=Asignaciones::all();
        return $obj->toJson();
    }

    /**
     * Limpiar asignaciones. Busca usuarios y los elimina si no están
     *
     * @return \Illuminate\Http\Response
     */
     public function limpieza()
     {
        Log::info('Inicio de limpieza');        
        $obj=Asignaciones::all();
        $counter=0;
        foreach ($obj as $asig) {
            $est=Estudiantes::find($asig->estudiantes_id);
            if(!$est){
                $toerase=Asignaciones::find($asig->id);
                $toerase->delete();
                $counter++;
            }
            $disc = Discursos::find($asig->discursos_id);
            if(!$disc){
                $toerase=Asignaciones::find($asig->id);
                $toerase->delete();
                $counter++;
            }
        }
        Log::info('Registros de asignaciones limpiados: '.$counter); 
        return response()->json(['msj'=>'Borrados '.$counter]);
     }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'type'=>'required',
            'point'=>'required',
            'room'=>'required',
            'discursos_id'=>'required',
            'estudiantes_id'=>'required'
        ]);
        $elem=new Asignaciones;
        $elem->type=$request->input('type');
        $elem->point=$request->input('point');
        $elem->room=$request->input('room');
        $elem->discursos_id=$request->input('discursos_id');
        $elem->estudiantes_id=$request->input('estudiantes_id');
        $elem->created_at=Carbon::now();
        $elem->updated_at=Carbon::now();
        $elem->save();
        return response()->json(['msj'=>'Asignación creada con ID '.$elem->id]);
    }

    /**
     * Guarda el futurepoint
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function futurepoint(Request $request)
    {
        Log::Info('Entramos a future');
        $elem=Asignaciones::findOrFail($request->input('id'));
        $elem->futurepoint=$request->input('pto');
        $elem->updated_at=Carbon::now();
        $elem->save();
        return response()->json(['msj'=>'Punto futuro ajustado: Punto '.$elem->futurepoint.', ID '.$elem->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $obj=Asignaciones::findOrFail($id);
        return $obj->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'type'=>'required',
            'point'=>'required',
            'room'=>'required',
            'discursos_id'=>'required',
            'estudiantes_id'=>'required'
        ]);
        $elem=Asignaciones::findOrFail($id);
        $elem->type=$request->input('type');
        $elem->point=$request->input('point');
        $elem->room=$request->input('room');
        $elem->discursos_id=$request->input('discursos_id');
        $elem->updated_at=Carbon::now();
        $elem->estudiantes_id=$request->input('estudiantes_id');
        $elem->save();
        return response()->json(['msj'=>'Asignación actualizada con ID '.$elem->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $obj=Asignaciones::findOrFail($id);
        $obj->delete();
        return response()->json(['msj'=>'Asignación eliminada con ID '.$elem->id]); 
    }
}
