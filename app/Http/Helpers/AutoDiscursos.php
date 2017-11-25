<?php
namespace App\Http\Helpers;
use App\Http\Helpers\Contracts\AutoDiscursosContract;
use Illuminate\Http\Request;
use App\Discursos;
use Carbon\Carbon;
use Log;

class AutoDiscursos implements AutoDiscursosContract
{
    public function complete()
    {
        $year=Carbon::today()->year;
        for ($i=0; $i < 2; $i++) {  // Número de años en base de datos
            $this->crearDiscursos($year+$i);
        }
        return true;
    }

    public function crearDiscursos($year){
        $elements = Discursos::where('week','like','%'.$year.'%')->first();
        if($elements) return false; // Ya existe este año

        // Si pasa acá es porque el año no existe
        Log::info('SE CREA AÑO '.$year);
        $firstMon=Carbon::create($year,1,7)->startOfWeek();
        $mondays=array();
        $yearRev=$year;
        while ($yearRev == $year) {
            $sem=new Carbon($firstMon);
            $mondays[]=$sem;
            $year=$firstMon->addWeek(1)->year;
        }
        foreach ($mondays as $monday) {
            for ($i=1; $i <= 4; $i++) { 
                $el=new Discursos;
                $el->alloc=$i;
                $el->week=$monday;
                $el->updated_at=Carbon::now();
                $el->created_at=Carbon::now();
                $el->save();
            }
        }
        return true;
    }
}