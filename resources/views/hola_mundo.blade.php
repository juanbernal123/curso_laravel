@extends('plantilla')

{{-- seccion del titulo de la pagina --}}
@section('titulo','Hola Mundo')

{{-- seccion del nombre del card --}}
@section('nombre_card','Hola Mundo')

{{-- seccion del cuerpo del card --}}
@section('cuerpo_card')
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
@endsection


@section('pie_card')

<center>
    hola soy un pie de pagina
</center>

@endsection