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
                $query->with('discursos')->where('type',$tipo)->orderBy('created_at', '');
            }])->where('id','>',0)->get();
            return $obj->toJson();
        }
        $obj=Estudiantes::with(['asignaciones'=>function($query) use($tipo){
            $query->with('discursos')->where('type',$tipo)->orderBy('created_at', '');
        }])->where('sex', $genero)->get();
        return $obj->toJson();
    }
}