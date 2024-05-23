<?php

namespace App\Http\Controllers;


use App\Models\QuizModel;
use Illuminate\Http\Request;
use Inertia\Inertia;    
use Illuminate\Http\RedirectResponse;


class ExamController extends Controller
{
    function exampage()
    {
        return Inertia::render('page/QuizPage');
    }
    function jsonQuiz()
    { 
        $data = QuizModel::all();
        return $data;
    }
    function deleteQuiz($id)
    {
        $data = QuizModel::find($id);
        $data -> delete();
        return redirect()->back();
    }
    function addQuiz(Request $request): RedirectResponse
    {
        $model = new QuizModel();
        $model -> Question = $request->question;
        $model -> Aa = $request->answerA;
        $model -> Ab = $request->answerB;
        $model -> Ac = $request->answerC;
        $model -> Ad = $request->answerD;
        $model -> Akey = $request->Akey;
        $model -> difficulty = $request->Alvl;
        $model -> department_name = "Enginnering";
        $model->save();
        return redirect()->back();
    }
    function saveEditQuiz(Request $request): RedirectResponse
    {
        $id = $request->id;
        $model = QuizModel::find($id);
        $model -> Question = $request->question;
        $model -> Aa = $request->answerA;
        $model -> Ab = $request->answerB;
        $model -> Ac = $request->answerC;
        $model -> Ad = $request->answerD;
        $model -> Akey = $request->Akey;
        $model -> difficulty = $request->Alvl;
        $model -> department_name = "Enginnering";
        $model->save();
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
}