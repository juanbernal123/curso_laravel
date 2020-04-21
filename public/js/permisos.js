$(document).ready(function() {
    ver_tabla();
    //   alert('hola');
});

//funcion enter de los buscadores
$(document).on('keyup', '#txt_buscarModulo', function() {
    if (event.keyCode === 13) {
        buscar_modulo();
    }
});

//funcion para buscar por modulo
function buscar_modulo() {
    var modulo = $('#txt_buscarModulo').val();

    if (modulo == "") {
        ver_tabla();
    } else {
        $.get('buscar_permiso_modulo', {
                modulo: modulo
            },
            function(data) {
                if (data == '') {
                    $('#tabla').html("");
                    $('#tabla').html("<br> <div class='text-center h5'>No se encontraron registros. 😕</div>");
                } else {
                    $('#tabla').empty().html(data);
                }
            });
    }

}

//limpieza de filtros
function limpiar_filtro(campo) {
    $(campo).val('');
    ver_tabla();
}

$(document).on('click', ".pagination li a", function(e) {
    e.preventDefault();
    var url = $(this).attr("href");

    $.ajax({
        type: 'get',
        url: url,
        success: function(data) {
            $('#tabla').empty().html(data);
        }
    });

});




function guardar(check_id, rol_id, permiso_id) {
    // console.log(rol_id, permiso_id);
    var token = $("meta[name='csrf-token']").attr("content");

    if ($('#' + check_id).is(":checked") == true) {
        // alert('checkbox esta seleccionado');
        var data = {
            permisos_id: permiso_id,
            rol_usuario_id: rol_id,
            estado: 1,
            _token: token
        };
        asignar(data);
    } else {
        // alert('checkbox NO esta seleccionado');
        var data = {
            permisos_id: permiso_id,
            rol_usuario_id: rol_id,
            estado: 0,
            _token: token
        };
        revocar(data);
    }
}

function asignar(data) {
    $.ajax({
        type: 'post',
        url: 'permisos/asignar',
        data: data,
        success: function(result) {
            if (result.success == 'true') {
                // ver_tabla();
                alertify.success('Permiso Asignado Correctamente.');
            }
        }
    });

}

function revocar(data) {
    $.ajax({
        type: 'post',
        url: 'permisos/revocar',
        data: data,
        success: function(result) {
            if (result.delete == 'true') {
                // ver_tabla();
                alertify.success('Permiso Eliminado Correctamente.');
            }
        }
    });

}


function ver_tabla() {
    $.ajax({
        type: 'get',
        url: 'tblPermisos',
        success: function(data) {
            $('#tabla').empty().html(data);
        }
    });
};


function mostrar(id) {
    var route = "{{ url('permisos') }}/" + id + "/edit";
    $.get(route, function(data) {
        $('#id').val(data.id);
        $('#descri_ciclo').val(data.descri_ciclo);
    });
};


$('#btn-actualizar').click(function() {
    var id = $('#id').val();
    var nombre = $('#descri_ciclo').val();
    var route = "{{ url('permisos') }}/" + id + "";
    var token = $('#token').val();

    $.ajax({
        url: route,
        headers: {
            'X-CSRF-TOKEN': token
        },
        type: 'PUT',
        dataType: 'json',
        data: {
            descri_ciclo: nombre
        },
        success: function(data) {
            if (data.success == 'true') {
                $('#modalEditar').modal('toggle');
                swal("Se ha Actualizado correctamente.", '', 'success');
                ver_tabla();
            }
        }
    });
});


function eliminar(ruta, cod) {
    var id = cod;
    var ruta = ruta;
    var token = $("meta[name='csrf-token']").attr("content");
    // console.log(id);

    swal({
            title: "¿Estas seguro de Eliminar este Registro?",
            text: "",
            icon: "warning",
            buttons: {
                catch: {
                    text: "Sí",
                    value: "catch",
                },
                cancel: "No",
            },
            dangerMode: true,
        })
        .then((value) => {
            switch (value) {
                case "catch":

                    $.ajax({
                        url: ruta + "/" + id,
                        type: 'DELETE',
                        data: {
                            "id": id,
                            "_token": token,
                        },
                        success: function(data) {

                            if (data.success == 'true') {
                                swal("Registro Eliminado Correctamente.", '', 'success');
                                ver_tabla();
                            }
                        }
                    });
                    break;
            };
        });
}