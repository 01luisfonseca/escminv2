<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Discursos extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'discursos';

    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'U';
    public $timestamps = false;

    public function asignaciones(){
        return $this->hasMany('App\Asignaciones','discursos_id');
    }
}
