<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course_Handled_By;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'role' => $request->role,
            'IDnumber' => $request->IDnumber,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        if ($data = $request->course) {
            foreach ($data as $datas) {
                    $user->HandledCourses()->create([
                        'prof_id' => $user->id,
                        'prof_IDnumber'=>$user->IDnumber,
                        'prof_name'=>$user->name,
                        'prof_email'=>$user->email,
                        'course_code' => $datas,  
                    ]);
        
    }
}

        event(new Registered($user));
        return redirect()->route('reg_teacher');
      

        // Auth::login($user);
        // return redirect(route('dashboard', absolute: false));


    }
}