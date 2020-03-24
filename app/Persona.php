<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{

    protected $fillable = [
        'nombre',
        'apellido',
        'fecha_nac',
        'ciudades_id',
    ];

    public function ciudad()
    {
        return $this->belongsTo(Ciudad::class, 'ciudades_id', 'id');
    }
}
