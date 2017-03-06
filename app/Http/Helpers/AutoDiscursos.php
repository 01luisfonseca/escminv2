<?php
namespace App\Helpers;
use App\Helpers\Contracts\AutoDiscursosContract;
use Illuminate\Http\Request;
use App\Discursos;
use Carbon\Carbon;

class AutoDiscursos implements AutoDiscursosContract
{
    public function complete()
    {
        $monday=Carbon::today()->addWeek(8)->startOfWeek();
        $elem=Discursos::where('week', $monday)->first();
        if (!$elem) {
            return $this->crearDiscursos();
        }
        return false;
    }

    public function crearDiscursos(){
        $year=Carbon::today()->year;
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