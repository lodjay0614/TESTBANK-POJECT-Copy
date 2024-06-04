<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course_Handled_By extends Model
{
    use HasFactory;
    protected $table = 'course__handled__bies';
    protected $fillable = [
        'prof_id',
        'prof_IDnumber',
        'prof_name',
        'prof_email',
        'course_code',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}