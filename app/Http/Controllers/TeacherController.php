<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Course_Handled_By;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;

class TeacherController extends Controller
{
    function register()
    {
        return Inertia::render('page/reg_teacher');
    }
    function courses()
    {
        return Inertia::render('page/register_courses');
    }
    function jsonTeacherData()
    {
        $data = User::all()->where('role', "Teacher");
        return $data;
    }
    function jsonTeacherProfileData($id)
    {
        $data = User::find($id);
        return $data;
    }
    function jsonSession()
    {
        $status = DB::table('sessions')
        ->get();
        return $status;
    }
    function jsonHandledCourses($id)
    {   
        $result = DB::table('course__handled__bies')
            ->join('users', 'users.id', '=', 'course__handled__bies.prof_id')
            ->select('course__handled__bies.course_code')
            ->where('course__handled__bies.prof_id', '=', $id)
            ->get();
        return $result;
    }
    function Courses_Teacher($code)
    {
       $data = DB::table('course__handled__bies')
        ->select('prof_IDnumber', 'prof_name', 'prof_email')
        ->where('course_code', '=', $code)
        ->get();

        // $datas= json_decode(json_encode($data), true);
        
        // $result = DB::table('course__handled__bies')
        // ->rightJoin('users', 'users.id', '=', 'course__handled__bies.prof_id')
        // ->select('users.IDnumber','users.name', 'users.email')
        // ->where('users.id', '=', $datas)
        // ->get();
        return $data;
        
     
    }
}