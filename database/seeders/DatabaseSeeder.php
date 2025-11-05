<?php

namespace Database\Seeders;

use App\Models\ToDo;
use App\Models\ToDoDetail;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test',
            'email' => 'test@test.com',
            'password' => Hash::make('testtest'),
        ]);

        $toDo = ToDo::factory()->create();
        ToDoDetail::factory(5)->create([
            'to_do_id' => $toDo->id,
        ]);
    }
}
