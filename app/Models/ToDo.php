<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDo extends Model
{
    /** @use HasFactory<\Database\Factories\ToDoFactory> */
    use HasFactory;
    
    public function toDoDetails()
    {
        return $this->hasMany(ToDoDetail::class);
    }

    public function delete()
    {
        // 関連したToDoDetailを削除する
        $this->toDoDetails()->delete();

        // ToDoを削除する
        return Parent::delete();
    }

}
