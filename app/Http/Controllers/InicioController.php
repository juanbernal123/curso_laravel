<?php

namespace App\Http\Controllers;

class InicioController extends Controller
{

    //accion que va a la vista index
    public function index()
    {
        return \view('welcome');
    }

    //accion inicio
    public function inicio($name = "")
    {
        $datos = $name;
        return \view('hola_mundo', \compact('datos'));
    }

}