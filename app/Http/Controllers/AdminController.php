<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\CourseList;
use App\Models\Course_Handled_By;
use App\Models\QuizModel;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function register(Request $request)
    {
     $reg = new CourseList();
     $reg -> course_code = $request->course_code;
     $reg -> course_title = $request->course_title;
     $reg->save();

        return redirect()->back();  
    }
    public function jsoncourses()
    {
       $data = CourseList::all();
       return $data; 
    }
    public function viewData($id)
    {
       $data = User::find($id);
       return view('Details', ['data'=>$data]);
    }
    public function taskView()
    {
      return view('Task');
    }
    public function addCourse(Request $request)
    {
    
    }
    function regForm()
    {
      return Inertia::render('page/Reg_Form');
    }
    function deleteTeacher($id)
    {
      $data = User::find($id);
      $data->delete();

      return redirect()->back()->with('success', 'Profile Deleted Successfully!');
    }
    function Pending_json($id)
    {
      $data = Quizmodel::all()->where('handled_by', $id);
      return $data;
    }

}