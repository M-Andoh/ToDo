<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToDoDetail\StoreRequest;
use App\Http\Requests\ToDoDetail\UpdateRequest;
use App\Models\ToDoDetail;
use Illuminate\Http\Request;

class ToDoDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // ToDoDetailの一覧を取得する。
        $details = ToDoDetail::get();

        // ToDoDetailの一覧を返却する
        return $details;
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
        // 新規にToDoDetailモデルを作成する
        $detail = new ToDoDetail();

        // ToDoDetailモデルの値を格納する
        $detail->to_do_id =  $request->get('to_do_id');
        $detail->name =  $request->get('name');
        $detail->completed_flag =  $request->get('completed_flag');

        // ToDoDetailモデルを保存する
        $detail->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(ToDoDetail $toDoDetail)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ToDoDetail $toDoDetail)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, $id)
    {
        // $idに紐づくToDoDetailモデルを作成する
        $detail = ToDoDetail::find($id);

        // ToDoDetailモデルの値を格納する
        $detail->name =  $request->get('name');
        $detail->completed_flag =  $request->get('completed_flag');

        // ToDoDetailモデルを保存する
        $detail->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // $idに紐づくToDoDetailモデルを取得する
        $detail = ToDoDetail::find($id);

        // ToDoDetailモデルを削除する
        $detail->delete();
    }
}
