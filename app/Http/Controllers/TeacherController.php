<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
class TeacherController extends Controller
{
    function register()
    {
        return Inertia::render('page/register_teacher');
    }
}
