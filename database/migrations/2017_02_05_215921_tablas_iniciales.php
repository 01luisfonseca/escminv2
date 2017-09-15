<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TablasIniciales extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('sex');
            $table->boolean('estado');
            $table->timestamps();
        });
        Schema::create('discursos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('alloc');
            $table->date('week');
            $table->timestamps();
        });
        Schema::create('asignaciones', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('type');
            $table->integer('point');
            $table->string('room');
            $table->integer('estudiantes_id')->unsigned();
            $table->integer('discursos_id')->unsigned();
            $table->timestamps();
            
            //////////////////////////////////////////////////////////
            $table->foreign('estudiantes_id')->references('id')->on('estudiantes')->onDelete('cascade');
            $table->foreign('discursos_id')->references('id')->on('discursos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('estudiantes');
        Schema::drop('discursos');
        Schema::drop('asignaciones');
    }
}
