<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
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
    public function index($limit, $level)
        {

            $id =Auth::user()->id;
            
            // $level = DB::table('quiz_models')
            // ->join('ans_models', 'ans_models.Question_id', '=', 'quiz_models.id')
            // ->select('quiz_models.id','ans_models.Question_id','ans_models.Aa','ans_models.Ab','ans_models.Ac','ans_models.Ad','quiz_models.handled_by','quiz_models.id','quiz_models.Question','quiz_models.Qstatus','quiz_models.difficulty','ans_models.Aa','ans_models.Ab','ans_models.Ac','ans_models.Ad','quiz_models.Akey','quiz_models.FieldOf')
            // ->where('quiz_models.handled_by', '=', $id)
            // ->inRandomOrder()
            // ->limit($limit)
            // ->get();
            
            $level = QuizModel::orderByRaw('RAND()')
            ->join('ans_models', 'ans_models.Question_id', '=', 'quiz_models.id')
            ->select('quiz_models.id','ans_models.Question_id','ans_models.Aa','ans_models.Ab','ans_models.Ac','ans_models.Ad','quiz_models.handled_by','quiz_models.id','quiz_models.Question','quiz_models.Qstatus','quiz_models.difficulty','ans_models.Aa','ans_models.Ab','ans_models.Ac','ans_models.Ad','quiz_models.Akey','quiz_models.FieldOf')
            ->where('quiz_models.handled_by', '=', $id)
            ->take($limit)
            ->get();

            return $level;
        }
        public function index_ans()
        {
            $id =Auth::user()->id;

            $level = DB::table('quiz_models')
            ->join('ans_models', 'ans_models.Question_id', '=', 'quiz_models.id')
            ->select('ans_models.Question_id','ans_models.Aa','ans_models.Ab','ans_models.Ac','ans_models.Ad')
            ->where('quiz_models.handled_by', '=', $id)
            ->get();

            return $level;
        }
}