<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Estudiantes extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'estudiantes';

    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'U';

    public $timestamps = false;

    public function asignaciones(){
        return $this->hasMany('App\Asignaciones','estudiantes_id');
    }
}
