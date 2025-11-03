<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDoDetail extends Model
{
    /** @use HasFactory<\Database\Factories\ToDoDetailFactory> */
    use HasFactory;

    protected $fillable = ['to?do_id', 'name', 'completed_flag'];

    protected $casts = [
        'completed_flag' => 'boolean',
    ];

    public function toDo()
    {
        return $this->belongsTo(ToDo::class);
    }
}
