<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Asignaciones extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'asignaciones';

    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'U';
    public $timestamps = false;

     public function discursos(){
        return $this->belongsTo('App\Discursos');
    }

    public function estudiantes(){
        return $this->belongsTo('App\Estudiantes');
    }

}
