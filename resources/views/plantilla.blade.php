<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{ asset('/css/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/estilo.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/all.css') }}">
    <script src="{{ asset('/js/jquery.js') }}"></script>
    <script src="{{ asset('/js/bootstrap.js') }}"></script>
    <script src="{{ asset('/js/bootstrap.bundle.js') }}"></script>
    <script src="{{ asset('/js/all.js') }}"></script>
    <title>@yield('titulo')</title>
</head>

<body>
    {{-- menu --}}
    @include('menu')

    <div class="container-fluid">

        <div class="row">
            <div class="col-sm-12">
                <div class="card bg-light mb-12">
                    <div class="card-header bg-primary">
                        <h3>
                            <center>
                                <Strong>
                                    @yield('nombre_card')
                                </Strong>
                            </center>
                        </h3>
                    </div>
                    <div class="card-body">


                        @if(session('exito'))
                        <span class="alert-success">{{session('exito')}}</span>
                        @endif

                        @if(session('error'))
                        <span class="alert-error">{{session('error')}}</span>
                        @endif

                        @yield('cuerpo_card')
                    </div>
                    <div class="card-footer bg-primary">
                        @yield('pie_card')
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{-- modal --}}
    <div class="modal fade" id="modalNuevo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">@yield('titulo_modal')</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @yield('cuerpo_modal')
                </div>
                <div class="modal-footer">
                    @yield('pie_modal')
                </div>
            </div>
        </div>
    </div>




</body>

</html>
