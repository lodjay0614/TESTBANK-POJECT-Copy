<?php

namespace App\Http\Controllers;


use App\Models\QuizModel;
use App\Models\AnsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;    
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;


class ExamController extends Controller
{
    function exampage()
    {
        return Inertia::render('page/QuizPage');
    }
    function jsonQuiz()
    { 
        $id =Auth::user()->id;

        $result = DB::table('quiz_models')
        ->join('ans_models', 'ans_models.Question_id', '=', 'quiz_models.id')
        ->select('quiz_models.handled_by','quiz_models.id','quiz_models.Question','quiz_models.Qstatus','quiz_models.difficulty','ans_models.Aa','ans_models.Ab','ans_models.Ac','ans_models.Ad','quiz_models.Akey','quiz_models.FieldOf')
        ->where('quiz_models.handled_by', '=', $id)
        ->get();
        return $result;

    }
    function deleteQuiz($id)
    {
        $data = QuizModel::find($id);
        $data -> delete();
        return redirect()->back();
    }
    function addQuiz(Request $request): RedirectResponse
    {
        $id = Auth::user()->id;
        $model = new QuizModel();
        $model -> handled_by = $id;
        $model -> Question = $request->question;
        $model -> Akey = $request->Akey;
        $model -> difficulty = $request->Alvl;
        $model -> FieldOf = $request->Fieldof;
        $model->save();

                    $model->Question()->create([
                        'Question_id' => $model->id,
                        'Aa'=>$request->answerA,
                        'Ab'=>$request->answerB,
                        'Ac'=>$request->answerC,
                        'Ad' => $request->answerD,  
                    ]);
        return redirect()->back();
    }
    function saveEditQuiz(Request $request): RedirectResponse
    {
        $id = $request->id;
        $model = QuizModel::find($id);
        $model -> Question = $request->question;
        $model -> Akey = $request->Akey;
        $model -> difficulty = $request->Alvl;
        $model -> FieldOf = $request->Fieldof;
        $model->save();

        $model->Question()->update([
            'Aa'=>$request->answerA,
            'Ab'=>$request->answerB,
            'Ac'=>$request->answerC,
            'Ad' => $request->answerD,  
        ]);

        return redirect()->back();
    }
    function quizJson()
    {
        $data = QuizModel::all();
        return $data;
    }
    function quizCountJson()
    {
        $data = QuizModel::all()->count();
        return $data;
    }

    function shuffle()
    {
        $data = AnsModel::all()->shuffle();
        return $data;
    }
}