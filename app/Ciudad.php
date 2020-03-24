<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ciudad extends Model
{
    public $table = 'ciudades';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
    ];

    public function persona()
    {
        return $this->hasMany(Persona::class);
    }

}
