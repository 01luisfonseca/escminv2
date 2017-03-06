<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Discursos;
use Carbon\Carbon;

class DiscursosCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $monday=Carbon::today()->startOfWeek();
        $future=Carbon::today()->addWeek(8)->startOfWeek();
        $obj=Discursos::whereBetween('week',[$monday, $future])->get();
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
            'alloc'=>'required',
            'week'=>'required',
        ]);
        $elem=new Discursos;
        $elem->alloc=$request->input('alloc');
        $elem->week=$request->input('week');
        $elem->save();
        return response()->json(['msj'=>'Discurso creado con ID '+$elem->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $obj=Discursos::findOrFail($id);
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
            'alloc'=>'required',
            'week'=>'required',
        ]);
        $elem=Discursos::findOrFail($id);
        $elem->alloc=$request->input('alloc');
        $elem->week=$request->input('week');
        $elem->save();
        return response()->json(['msj'=>'Discurso actualizado con ID '+$elem->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $obj=Discursos::findOrFail($id);
        $obj->delete();
        return response()->json(['msj'=>'Discurso eliminado con ID '+$elem->id]); 
    }
}
