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

{{-- incluimos el modal --}}
@include('ciudades.modalEditar')



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

@section('scripts')
<script>
    function ver_datos(id) {
        $.get('ciudades/' + id + '/edit', function (data) {
            // console.log(data);
            $('#id').val(data.id);
            $('input[name="nombre"]').val(data.nombre);
        });

        $('#btn_actualizar').on('click', function () {
            var id = $('#id').val();
            var nombre = $('input[name="nombre"]').val();
            var token = $('input[name="_token"]').val();
            $.ajax({
                url: 'ciudades/' + id,
                type: 'PUT',
                data: {
                    nombre: nombre,
                    _token: token
                },
                success: function (data) {
                    console.log(data);
                }
            });
        });

    }

</script>
@endsection
