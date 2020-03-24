@extends('plantilla') @section('titulo', 'Ciudad') @section('nombre_card', 'Ciudad')

@section('cuerpo_card')

<section class="text-right">

    <button class="btn btn-primary" data-toggle="modal" data-target="#modalNuevo">
        <i class="fas fa-plus-circle"></i>
        Nuevo
    </button>

</section>

<br>

@include('ciudades.tabla')


@section('titulo_modal', 'Agregar Ciudad')

@section('cuerpo_modal')

<form action="{{ route('ciudades.store')}}" method="post">
    @csrf
    @include('ciudades.form')

    @section('pie_modal')

    <button type="submit" class="btn btn-primary">
        <i class="fas fa-save"></i>
        Guardar
    </button>
</form>

@endsection




@endsection


@endsection
