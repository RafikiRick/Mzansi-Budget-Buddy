<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomeController extends Controller
{
    public function index(){
        return Inertia::render('income/index', []);
    }

    public function create(){
        return Inertia::render('income/create');
    }
}
