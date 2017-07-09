<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Estudiantes;
use Carbon\Carbon;
use App\Helpers\AutoDiscursos;

class EstudiantesCtrl extends Controller
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
        $obj=Estudiantes::where('id','>',0)->get();
        return $obj->toJson();
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
            'name'=>'required',
            'sex'=>'required',
            'estado'=>'required'
        ]);
        $elem=new Estudiantes;
        $elem->name=$request->input('name');
        $elem->sex=$request->input('sex');
        $elem->estado=$request->input('estado');
        $elem->created_at=Carbon::now();
        $elem->updated_at=Carbon::now();
        $elem->save();
        return response()->json(['msj'=>'Estudiante creado con ID '+$elem->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $obj=Estudiantes::with('asignaciones')->findOrFail($id);
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
            'name'=>'required',
            'sex'=>'required',
            'estado'=>'required'
        ]);
        $elem=Estudiantes::findOrFail($id);
        $elem->name=$request->input('name');
        $elem->sex=$request->input('sex');
        $elem->updated_at=Carbon::now();
        $elem->estado=$request->input('estado');
        $elem->save();
        return response()->json(['msj'=>'Estudiante actualizado con ID '+$elem->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $obj=Estudiantes::findOrFail($id);
        $obj->delete();
        return response()->json(['msj'=>'Estudiante eliminado con ID '+$obj->id]); 
    }

    /**
     * Muestra los asignables.
     *
     * @return \Illuminate\Http\Response
     */
    public function asignables($genero,$tipo)
    {
        $var=new AutoDiscursos;
        $var->complete();
        if ($genero=='ambos') {
            $obj=Estudiantes::with(['asignaciones'=>function($query) use($tipo){
                $query->with('discursos')
                    ->select('asignaciones.*','discursos.week')
                    ->join('discursos', 'discursos.id', '=', 'asignaciones.discursos_id')
                    ->where('type',$tipo)
                    ->orderBy('week', 'desc');
            }])->where('estado','>',0)->get();
            return $obj->toJson();
        }
        $obj=Estudiantes::with(['asignaciones'=>function($query) use($tipo){
            if ($tipo=='est') {
                // El estudiante debe mostrar si fue ayudante en el mes. 
                // Si fue ayudante en menos de treinta dias, se pone la fecha de ayudante
                $query->with('discursos')
                    ->select('asignaciones.*','discursos.week')
                    ->join('discursos', 'discursos.id', '=', 'asignaciones.discursos_id')
                    ->orderBy('week', 'desc');
            } else {
                $query->with('discursos')
                    ->select('asignaciones.*','discursos.week')
                    ->join('discursos', 'discursos.id', '=', 'asignaciones.discursos_id')
                    ->where('type',$tipo)
                    ->orderBy('week', 'desc');
            }
        }])->where('sex', $genero)->where('estado','>',0)->get();
        $now=Carbon::now();
        if ($tipo=='est') {
            foreach ($obj as $est) {
                $insWeek=null;
                $verifAcomp=false;
                foreach ($est->asignaciones as $asig) {
                    if ($asig->type=='acomp' && !$verifAcomp) {
                        $verifAcomp=true;
                        $week=Carbon::createFromFormat('Y-m-d', $asig->week);
                        if ($week->diffInDays($now) <= 28) {
                            // Si se hizo una asignacion de acompañante se cambia la fecha
                            // Se hace un límite de 28 dias desde la asignacion hasta hoy
                            $insWeek=$asig->week;//$now->startOfWeek()->toDateString();
                        }
                    }
                }
                if ($est->asignaciones->count()>0) {
                    $est->asignaciones->filter(function($el,$key){return $el->type=='est';});
                    // Se modifica el discurso mas reciente, el cual toma el software de discursos
                    if($insWeek) $est->asignaciones[0]->discursos->week=$insWeek;
                }
            }
        }
        return $obj->toJson();
    }
}