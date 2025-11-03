<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToDo\StoreRequest;
use App\Http\Requests\ToDo\UpdateRequest;
use App\Models\ToDo;
use Illuminate\Container\Attributes\Log as AttributesLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // ToDoの一覧を取得する。
        $todo = ToDo::with('toDoDetails')->get();

        // ToDoの一覧を返却する
        return $todo;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        // 新規にToDoモデルを作成する
        $todo = new ToDo();

        // ToDoモデルの値を格納する
        $todo->title =  $request->get('title');

        // ToDoモデルを保存する
        $todo->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(ToDo $toDo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ToDo $toDo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        // $idに紐づくToDoモデルを取得する
        $todo = ToDo::find($id);

        // ToDoモデルの値を格納する
        $todo->title =  $request->get('title');

        // ToDoモデルを保存する
        $todo->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // $idに紐づくToDoモデルを取得する
        $todo = ToDo::find($id);

        // ToDoモデルを削除する
        $todo->delete();
    }
}
