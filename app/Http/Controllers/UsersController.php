<?php

namespace App\Http\Controllers;

use App\Http\Requests\UsersRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function create()
    {
        return view('users.create');
    }

    public function store(UsersRequest $request)
    {
        User::create($request->validated());

        $request->session()->flash('message', 'You are redirected successfully.! Bro wow...');

        return response()->json(['status'=>'Hooray']);
    }
}
