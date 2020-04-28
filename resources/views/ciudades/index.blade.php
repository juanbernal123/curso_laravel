@extends('plantilla') @section('titulo', 'Ciudad') @section('nombre_card', 'Ciudad')

@section('cuerpo_card')

<section class="text-right">

    <button class="btn btn-primary" data-toggle="modal" data-target="#modalNuevo" onclick="$('#formNuevo')[0].reset();">
        <i class="fas fa-plus-circle"></i>
        Nuevo
    </button>

</section>

<br>

<div id="tabla"></div>

{{-- incluimos el modal --}}
@include('ciudades.modalEditar')



@section('titulo_modal', 'Agregar Ciudad')

@section('cuerpo_modal')

<form id="formNuevo" action="{{ route('ciudades.store')}}" method="post">
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
    $(document).ready(function () {
        ver_tabla();
    });

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
                    if (data == "ok") {
                        $('#modalEditar').modal('hide');
                        // swal("Guardado con exito", "", "success");
                        alertify.success('Guardado con exito');
                        ver_tabla();
                    }
                }
            });
        });

    }

    function ver_tabla() {
        $.get('tblCiudades', function (data) {
            $('#tabla').empty().html(data);
        });
    }

    function eliminar(id) {
        var ruta = 'ciudades/' + id;
        var token = $('input[name="_token"]').val();

        swal({
                title: "Esta seguro?",
                text: "Ejemplo",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {

                    $.ajax({
                        url: ruta,
                        data: {
                            _token: token
                        },
                        type: 'DELETE',
                        success: function (data) {
                            if (data == 'ok') {
                                swal('Eliminado con exito', '', 'success');
                                ver_tabla();
                            }
                        }
                    });

                }
            });
    }

</script>
@endsection
