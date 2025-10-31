<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SavingsController extends Controller
{
    public function index(){
        return Inertia::render('savings/index', []);
    }
}
