<?php

namespace App\Http\Controllers;

use App\Http\Requests\UsersRequest;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function create()
    {
        return view('users.create');
    }

    public function store(UsersRequest $request)
    {
        $request->session()->flash('message', 'You are redirected successfully.! Bro wow...');

        return response()->json(['status'=>'Hooray']);
    }
}
