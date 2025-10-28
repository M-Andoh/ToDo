<?php

use App\Http\Controllers\ToDoController;
use App\Http\Controllers\ToDoDetailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('todo')->group(function(){
    Route::resource('/detail', ToDoDetailController::class);
});
Route::resource('/todo', ToDoController::class);

