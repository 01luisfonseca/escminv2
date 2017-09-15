<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        DB::table('oauth_clients')->insert([
            'name'=>'LocalApp Password',
            'secret'=>'I8dVQ8umBnjfkru9VB6suAeHMbjr2QVUGRmNjGOn',
            'redirect'=>'http://localhost',
            'personal_access_client'=>0,
            'password_client'=>100,
            'revoked'=>0
        ]);
        DB::table('users')->insert([
            'name'=>'Luis Fonseca',
            'estado'=>1,
            'tipo'=>1,
            'email'=>'01luisfonseca@gmail.com',
            'password'=>bcrypt('Lf19830405'),
        ]);
        DB::table('users')->insert([
            'name'=>'ConSur',
            'estado'=>1,
            'tipo'=>1,
            'email'=>'jhefersongarcia9@gmail.com',
            'password'=>bcrypt('JHEFER*2709'),
        ]);
    }
}
