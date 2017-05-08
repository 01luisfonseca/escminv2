<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\User;
use Log;

class PerfilCtrl extends Controller
{
    /**
     * @var Request
     */
    protected $req;
    protected $id;
    public function __construct(Request $request)//Dependency injection
    {
        $this->req = $request;
    }
   
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $id=$this->req->user()->id;
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
    public function update()
    {
        $id=$this->req->user()->id;
        $obj=User::findOrFail($id);
        $this->validate($this->req,[
            'password'=>'required',
        ]);
        $obj->password=bcrypt($this->req->input('password'));
        $obj->save();
        return response()->json(['msj'=>'Nueva contraseña actualizada.']);
    }
}