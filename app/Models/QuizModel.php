<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizModel extends Model
{
    use HasFactory;
    protected $fillable = [
        'handled_by',
        'Qstatus',
        'Question',
        'Akey',
        'difficulty',
        'FieldOf',
    ];


    public function Question()
    {
        return $this->hasMany(AnsModel::class, 'Question_id', 'id');
    }
}
