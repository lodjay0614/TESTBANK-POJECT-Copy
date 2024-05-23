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
Route::get('/register_teacher', [TeacherController::class, 'register'])->name('register_teacher');
Route::get('/register_student', [StudentController::class, 'register'])->name('register_student');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/jsonQuiz', [ExamController::class, 'jsonQuiz']);
Route::get('/jsonQuizRandom/{limit}/{lvl}', [ExportController::class, 'index'])->name('jsonQuizRandom');
Route::get('/quizes', [ExamController::class, 'Quizes'])->name('quizes');
Route::get('/delete/{id}', [ExamController::class, 'deleteQuiz'])->name('deleteQuiz');
Route::post('/addQuiz', [ExamController::class, 'addQuiz'])->name('addQuiz');
Route::post('/saveEdit', [ExamController::class, 'saveEditQuiz'])->name('saveEdit');
Route::get('/jsonCount', [ExamController::class, 'quizCountJson'])->name('quizCountJson');


Route::post('/register', [AdminController::class, 'store'])->name('RegisterTeacher');



require __DIR__.'/auth.php';