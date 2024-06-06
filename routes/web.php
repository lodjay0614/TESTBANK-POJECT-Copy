<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route::get('/', function(){
    return Inertia::render('Auth/Login');
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/exampage', [ExamController::class, 'exampage'])->name('exampage');
Route::get('/export', [ExportController::class, 'exportFile'])->middleware(['auth', 'verified'])->name('export');
Route::get('/reg_teacher', [TeacherController::class, 'register'])->name('reg_teacher');
Route::get('/register_student', [StudentController::class, 'register'])->name('register_student');
Route::get('/register_courses', [TeacherController::class, 'courses'])->name('register_courses');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
// admin
Route::post('/reg_course', [AdminController::class, "register"])->name("reg_courses");
Route::get('/jsoncourse', [AdminController::class, "jsoncourses"]);
Route::get('/viewData/{id}', [AdminController::class, "viewData"]);
Route::get('/task', [AdminController::class, "taskView"])->name('task');
Route::post('/addCourse', [AdminController::class, "addCourse"])->name('addCourse');
Route::get('/reg_form', [AdminController::class, "regForm"])->name('reg_form');
Route::get('/HandleTeacherDelete/{id}', [AdminController::class, "deleteTeacher"]);
Route::get('/pending_question/{id}', [AdminController::class, "Pending_json"]);
// end admin

// quiz
Route::get('/jsonQuiz', [ExamController::class, 'jsonQuiz']);
Route::get('/jsonQuizRandom/{limit}/{level}', [ExportController::class, 'index']);
Route::get('/jsonQuizAnsRandom', [ExportController::class, 'index_ans']);
Route::get('/quizes', [ExamController::class, 'Quizes'])->name('quizes');
Route::get('/delete/{id}', [ExamController::class, 'deleteQuiz'])->name('deleteQuiz');
Route::post('/addQuiz', [ExamController::class, 'addQuiz'])->name('addQuiz');
Route::post('/saveEdit', [ExamController::class, 'saveEditQuiz'])->name('saveEdit');
Route::get('/jsonCount', [ExamController::class, 'quizCountJson'])->name('quizCountJson');
Route::get('/shuffle', [ExamController::class, 'shuffle']);
// end quiz

// teacher
Route::get('/jsonTeacher', [TeacherController::class, 'jsonTeacherData']);
Route::get('/jsonTeacherProfile/{id}', [TeacherController::class, 'jsonTeacherProfileData']);
Route::get('/jsonSession', [TeacherController::class, 'jsonSession']);
Route::get('/jsonHandledCourses/{id}', [TeacherController::class, 'jsonHandledCourses']);
Route::get('/CoursesinTeacher/{code}', [TeacherController::class, 'Courses_Teacher']);
// end teacher

require __DIR__.'/auth.php';