<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpensesController extends Controller
{
    public function index(){
        return Inertia::render('expenses/index', []);
    }

    public function create(){
        return Inertia::render('expenses/create');
    }
}
