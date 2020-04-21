//***** inicializa la pagina *****
$(document).ready(function () {
    //***** capturamos cuando el select turno cambia de estado *****

    $('#turnos_id').on('change', function () {
        var turno = $(this).val();
        var periodo = $('#periodo_escolar_id').val();
        if (turno == '') {
            $('#cursos_id').empty();
        }
        // swal(periodo);
        $.get('buscar_curso', {
            turno: turno,
            periodo: periodo
        }, function (data) {
            if (data != '') {
                $('#cursos_id').empty();
                $('#cursos_id').append("<option value='' disabled selected>Seleccione</option>");
                $.each(data, function (index, value) {
                    $('#cursos_id').append("<option value='" + index + "'>" + value + "</option>");
                });
            } else {
                $('#cursos_id').empty();
            }
        });
    });

    //***** para busqueda de grado en los filtros *****

    $('#cbo_turno').on('change', function () {
        $('#tabla').html("");
        limpiar();
        var turno = $(this).val();
        var periodo = $('#cbo_periodo').val();
        $.get('buscar_curso', {
            turno: turno,
            periodo: periodo
        }, function (data) {
            if (data != '') {
                $('#cbo_grado').empty();
                $('#cbo_grado').html(data);
            } else {
                $('#cbo_grado').empty();
                $('#cod_aula').val('');
            }
        });
    });

    //***** para separar el codigo del curso en el campo cod_curso *****

    $('#cbo_grado').on('change', function () {
        var cod_curso = $(this).val();
        $('#cod_aula').val(cod_curso);
    });

    //funcion guardar

    $('#form-nuevo').on('submit', function () {
        event.preventDefault();

        var formdata = $(this).serialize(); // here $(this) refere to the form its submitting
        // console.log(formdata);
        if ($('.personas_id').val() == '') {
            $('.errores').html('Debe ingresar a la persona a matricular.');
            $('.errores').fadeIn();
        }
        $.ajax({
            type: 'POST',
            url: "matriculaciones",
            data: formdata, // here $(this) refers to the ajax object not form
            dataType: 'json',
            success: function (data) {
                $('#modalNuevo').modal('hide');
                ver_nomina();
                $('#form-nuevo')[0].reset();
                $('#contacto')[0].reset();
                var dropDown = document.getElementById("rueid");
                dropDown.selectedIndex = 0;
                $('#buscar_nombre').val('')
                $('#buscar_documento').val('')
                $('input[name="fecha_nacimiento"]').val('');
                document.getElementById('datos_contacto').hidden = true;
                if (data.nuevo == 'true') {
                    swal("¡Estudiante Nuevo!", 'Matriculado Correctamente.', 'success');
                } else if (data.success == 'true') {
                    swal("Estudiante Matriculado Correctamente.", '', 'success');
                } else if (data.mensaje) {
                    swal(data.mensaje, data.cuerpo, 'error');
                }
            },
        });


    });

    // funcion guardar contactos
    $('#contacto').on('submit', function () {
        event.preventDefault();

        var formdata = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: "contactos",
            data: formdata,
            dataType: 'json',
            success: function (data) {
                $('#modalAux').modal('hide');
                $('#contacto')[0].reset();
                if (data.nuevo == 'true') {
                    alertify.success('Se ha Guardado Correctamente.');
                    actualizar_contactos();
                } else if (data.error) {
                    alertify.error(data.error[0]);
                }
            },
        });
    });

    // funcion guardar tipo de contactos
    $('#tipoContacto').on('submit', function () {
        event.preventDefault();

        var formdata = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: "tipo_contacto",
            data: formdata,
            dataType: 'json',
            success: function (data) {
                $('#modalAux2').modal('hide');
                $('#tipoContacto')[0].reset();
                if (data.nuevo == 'true') {
                    alertify.success('Se ha Guardado Correctamente.');
                    actualizar_tipoContactos();
                } else {
                    alertify.error(data.error[0]);
                }
            },
        });
    });

    //***** actualizar estado de la matricula *****/

    $('#form_editar').on('submit', function () {
        event.preventDefault();
        var id = $('.id').val();
        var formdata = $(this).serialize();
        var token = $('#token').val();

        $.ajax({
            type: 'PUT',
            headers: {
                'X-CSRF-TOKEN': token
            },
            url: "matriculaciones/" + id,
            data: formdata,
            dataType: 'json',
            success: function (data) {
                if (data.actualizado == 'true') {
                    swal("¡Actualizado Correctamente!", '', 'success');
                    ver_nomina();
                    $('#modalEditar').modal('hide');
                    $('#form_editar')[0].reset();
                } else {
                    swal('¡Ha Ocurrido un error!', data.error[0], 'error');
                }
            },
        });

    });

    //funcion para los reportes
    $('#btn_reporte').click(function () {
        reportes();
    });

});

//***** funcion para ver el detalle*****/
function collapse(btn_id, id) {
    var boton = $('#' + btn_id).val();
    if (boton == 'true') {
        $('.select').hide();
        $('#' + btn_id).val('false');
        // alert('ok');
    } else {
        $('.select').hide();
        $('.' + id).toggle("slow");
        $('#' + btn_id).val('true');
        // alert('nok');
    }

}

//***** funcion para mostrar la seccion y poder cambiar de turno o seccion*****/

function cambiar_turno(id, grado_id, curso_id) {
    var matriculacion_id = id;
    $('#matriculacion_id').val(matriculacion_id)
    var periodo = periodo_id();
    var curso = curso_id;
    var ruta = 'cambiar_turno';

    $.get(ruta, {
            matriculacion_id: matriculacion_id,
            grado_id: grado_id,
            curso_id: curso,
            periodo: periodo
        },
        function (data) {
            $('#tabla_cursos').html('');
            $('#tabla_cursos').html(data);
        });
}

//***** guardar turno o seccion nueva del estudiante *****/

function turno_nuevo(curso_id) {
    var curso = curso_id;
    var matricula = $('#matriculacion_id').val();
    var estado = 1; //corresponde al id de Regular 
    var ruta = 'actualizar_matricula/' + matricula;
    var token = $("meta[name='csrf-token']").attr("content");

    swal({
            title: "¿Estas seguro de cambiar de Turno/Sección?",
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
                        type: 'PUT',
                        headers: {
                            'X-CSRF-TOKEN': token
                        },
                        url: ruta,
                        data: {
                            cursos_id: curso,
                            estado_matricula_id: estado
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.actualizado == 'true') {
                                swal("¡Actualizado Correctamente!", '', 'success');
                                ver_nomina();
                                $('#modalEditarTurno').modal('hide');
                            } else {
                                swal('¡Ha Ocurrido un error!', data.error[0], 'error');
                            }
                        },
                    });

                    break;
            };
        });
}

//***** mostrar datos de la matricula *****/

function mostrar(id, nombre) {
    var ruta = 'matriculaciones/' + id + '/edit';
    $('.id').val(id);
    $('.persona_nombre').val(nombre);

    $.get(ruta, function (data) {
        $('#estado_matricula_id').val(data.estado_matricula_id);
        $('#rue_id').val(data.rue_id);
        if (data.documentos == "partida,cedula") {
            document.getElementById("partida").checked = true;
            document.getElementById("cedula").checked = true;
        } else if (data.documentos == "partida") {
            document.getElementById("partida").checked = true;
            document.getElementById("cedula").checked = false;
        } else if (data.documentos == "cedula") {
            document.getElementById("partida").checked = false;
            document.getElementById("cedula").checked = true;
        } else {
            document.getElementById("partida").checked = false;
            document.getElementById("cedula").checked = false;
        }
        // console.log(data);
    });
}

//***** actualizar select de contacto *****/

function actualizar_contactos() {
    var documento_contacto = $('#documento_contacto').val();
    buscar_contacto(documento_contacto);
}

//***** actualizar select de tipo de contacto *****/

function actualizar_tipoContactos() {
    $.get('actualizar_tipoContactos', function (data) {
        if (data != '') {
            $('#tipo_contacto').empty();
            $('#tipo_contacto').html(data);
        } else {
            $('#tipo_contacto').empty();
        }
    });
}

//**** funcion mostrar para guardar *****/

function nuevo() {
    //capturamos los id de los select
    var id_curso = grado_id();
    var periodo = periodo_id();
    var estado = estado_id();

    $('input[name="estado_matricula_id"]').val(estado);
    $('input[name="periodo_escolar_id"]').val(periodo);
    $('input[name="cursos_id"]').val(id_curso);
}

//***** funcion para limpiar campos *****

function limpiar() {
    //ocultamos el boton nuevo
    document.getElementById('btn_nuevo').hidden = true;

    $('#cod_aula').val('');
    $('#nro_aula').val('');
    $('#cod_ciclo').val('');
    $('#cod_pabellon').val('');
    $('#txt_masculino').val('');
    $('#txt_femenino').val('');
    $('#txt_total').val('');
}

//***** comprobar si existe la persona existe *****

// function existe_persona(documento, nombre, ruta) {
//     $.ajax({
//         url: ruta + "/" + documento,
//         type: 'get',
//         dataType: 'json',
//         data: {
//             documento: documento,
//             nombre: nombre
//         },
//         success: function(data) {
//             if (data.success == 'true') {
//                 swal("Existe.", '', 'success');
//             } else {
//                 swal("No Existe.", '', 'error');
//             }
//         }

//     });
// };

//***** funcion para cargar la nomina *****

function ver_nomina() {
    $('#tabla').html("");

    //habilitamos el boton add
    document.getElementById('btn_nuevo').hidden = false;
    var id_curso = grado_id();
    var periodo = periodo_id();
    var estado = estado_id();
    var rue = rue_id();
    var screen = $('#loading-screen');
    cadena = "curso=" + id_curso + "&per=" + periodo + "&est=" + estado + "&rue=" + rue;
    //cosultamos si los datos no estan vacios
    if (id_curso == "") {
        swal("Debes seleccionar un curso.!");
        return;
    } else {
        configureLoadingScreen(screen);
        //swal(id_curso);
        //swal(periodo);
        //swal(estado);
        $.ajax({
            type: "get",
            data: cadena,
            url: "tblMatriculaciones",
            success: function (r) {
                $('#tabla').html("");
                if (r) {
                    $('#tabla').html(r);
                    contar();
                    detalle_aula();
                } else {
                    $('#tabla').html("");
                    contar();
                    $('#tabla').html("<div class='text-center h5'>No se encontraron registros. 😕</div>");
                }
            },
            // statusCode: {
            //     401: function() {
            //         window.location.href = 'login'; //or what ever is your login URI 
            //     }
            // }
        });
    }
}

//***** funcion para contar sexadamente con el total *****

function contar() {
    $('#txt_masculino').val('');
    $('#txt_femenino').val('');
    $('#txt_total').val('');

    var id_curso = grado_id();
    var periodo = periodo_id();
    var estado = estado_id();
    var rue = rue_id();
    var token = $("meta[name='csrf-token']").attr("content");
    cadena = {
        curso: id_curso,
        per: periodo,
        est: estado,
        rue: rue,
        _token: token
    };

    $.ajax({
        type: "post",
        data: cadena,
        dataType: 'json',
        url: "contar_estudiantes",
        success: function (r) {
            $datos = r;
            $('#txt_masculino').val($datos['masc']);
            $('#txt_femenino').val($datos['fem']);
            $('#txt_total').val($datos['total']);
        }
    });
}

//***** detalles como codigo de aula pabellon ciclo y docente *****

function detalle_aula() {
    $('#txt_docente').val('');
    $('#nro_aula').val('');
    $('#cod_ciclo').val('');
    $('#cod_pabellon').val('');

    var id_curso = grado_id();
    var periodo = periodo_id();
    var estado = estado_id();
    var rue = rue_id();
    var token = $("meta[name='csrf-token']").attr("content");
    cadena = {
        curso: id_curso,
        per: periodo,
        est: estado,
        rue: rue,
        _token: token
    };

    $.ajax({
        type: "post",
        data: cadena,
        dataType: 'json',
        url: "detalle_aula",
        success: function (r) {
            $datos = r;
            $('#txt_docente').val($datos['docente']);
            $('#nro_aula').val($datos['sala']);
            $('#cod_ciclo').val($datos['ciclo']);
            $('#cod_pabellon').val($datos['pabellon']);
        }
    });
}

//***** funcion para capturar el id del combobox *****

function estado_id() {
    /* Para obtener el valor */
    var cod = document.getElementById("cbo_estado").value;
    //swal(cod);
    return cod;
}

//***** funcion para capturar el id del combobox *****

function rue_id() {
    /* Para obtener el valor */
    var cod = document.getElementById("cbo_rue").value;
    //swal(cod);
    return cod;
}

//***** funcion para capturar el id del combobox *****

function periodo_id() {
    /* Para obtener el valor */
    var cod = document.getElementById("cbo_periodo").value;
    //swal(cod);
    return cod;
}

//***** funcion para capturar el id del combobox *****

function grado_id() {
    /* Para obtener el valor */
    var cod = document.getElementById("cbo_grado").value;
    //swal(cod);
    return cod;
}

//funcion para capturar el texto del combobox

function grado_descri() {
    /* Para obtener el texto */
    var combo = document.getElementById("cbo_grado");
    var selected = combo.options[combo.selectedIndex].text;
    //swal(selected);
    return selected;
}

//funcion para capturar el texto del combobox

function turno_nombre() {
    /* Para obtener el texto */
    var combo = document.getElementById("cbo_turno");
    var selected = combo.options[combo.selectedIndex].text;
    //swal(selected);
    return selected;
}

//funcion para capturar el texto del combobox

function periodo_nombre() {
    /* Para obtener el texto */
    var combo = document.getElementById("cbo_periodo");
    var selected = combo.options[combo.selectedIndex].text;
    //swal(selected);
    return selected;
}

//***** funcion para mostrar y ocultar el gif de carga mientras se ejecuta el ajax *****

function configureLoadingScreen(screen) {
    $(document)
        .ajaxStart(function () {
            screen.fadeIn();
        })
        .ajaxStop(function () {
            screen.fadeOut();
        });
}


//*****************************SECCION REPORTES *********************/

//funcion para capturar el id del combobox
function reporte_valor() {
    /* Para obtener el valor */
    var cod = document.getElementById("cbo_reportes").value;
    //swal(cod);
    return cod;
}

function reportes() {
    var id_curso = $('#cod_aula').val();
    var nombre_archivo = reporte_valor();

    //cosultamos si los datos no estan vacios
    if (id_curso == "") {
        swal("Debes seleccionar un Curso.!", "", "info");
        return;
    }

    if (nombre_archivo == "") {
        swal("Debes seleccionar una opcion para imprimir.!", "", "info");
        return;
    } else {


        var id_curso = grado_id();
        var periodo = periodo_id();
        var estado = estado_id();
        var rue = rue_id();
        var docente = $('#txt_docente').val();
        var nombre_grado = grado_descri();
        var turno = turno_nombre();
        var año = periodo_nombre();
        var mas = $('#txt_masculino').val();
        var fem = $('#txt_femenino').val();
        var total = $('#txt_total').val();

        cadena = "?curso=" + id_curso + "&per=" + periodo + "&masc=" + mas + "&fem=" + fem + "&total=" + total + "&est=" + estado + "&rue=" + rue + "&grado=" + nombre_grado + "&turno=" + turno + "&año=" + año + "&docente=" + docente;
        // cadena_get = "?curso=" + id_curso + "&estado=" + estado + "&grado=" + nombre_grado + "&turno=" + turno + "&docente=" + docente;
        window.open(nombre_archivo + cadena, '_blank');
    }
}

//constancia de inscripcion

function constancia_incripcion(id) {
    var matricula = id;

    cadena_get = "?matricula=" + matricula;

    window.open('constancia_incripcion' + cadena_get, '_blank');
}





//*********************************************************
