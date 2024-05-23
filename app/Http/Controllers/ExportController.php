<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\QuizModel;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class ExportController extends Controller
{
    function exportFile()
    {
        return Inertia::render('page/Export');
    }
    public function index($limit, $lvl)
        {
            $level = QuizModel::inRandomOrder()
                ->where("difficulty", $lvl)
                ->limit($limit)
                ->get();

                return $level;
          
        }
}