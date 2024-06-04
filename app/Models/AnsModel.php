<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnsModel extends Model
{
    use HasFactory;
    protected $table = 'ans_models';
    protected $fillable = [
        'Question_id',
       'Aa',
       'Ab',
       'Ac',
       'Ad',
    ];
    public function answer()
    {
        return $this->belongsTo(QuizModel::class);
    }
}
