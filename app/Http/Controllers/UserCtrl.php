<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Carbon\Carbon;

class UserCtrl extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $obj=User::where('id','>',1)->get();
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
            'estado'=>'required',
            'tipo'=>'required',
            'email'=>'required',
            'password'=>'required'
        ]);
        $elem=new User;
        $elem->name=$request->input('name');
        $elem->tipo=$request->input('tipo');
        $elem->estado=$request->input('estado');
        $elem->email=$request->input('email');
        $elem->password=bcrypt($request->input('password'));
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
        $obj=User::findOrFail($id);
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
            'estado'=>'required',
            'tipo'=>'required',
            'email'=>'required',
            'password'=>'required'
        ]);
        $elem=User::findOrFail($id);
        $elem->name=$request->input('name');
        $elem->tipo=$request->input('tipo');
        $elem->estado=$request->input('estado');
        $elem->email=$request->input('email');
        $elem->password=bcrypt($request->input('password'));
        $elem->updated_at=Carbon::now();
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
}