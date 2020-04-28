<table class="table table-bordered">
    <thead>
        <tr>
            <th scope="col">Código</th>
            <th scope="col">Nombre</th>
            <th scope="col">Acciones</th>
        </tr>
    </thead>
    <tbody>

        @foreach($datos as $item)

        <tr>
            <th scope="row">{{ $item->id }}</th>
            <td>{{ $item->nombre}}</td>
            <td>
                <button class="btn btn-warning" data-toggle="modal" data-target="#modalEditar"
                    onclick="ver_datos({{ $item->id }});">
                    <i class="fas fa-pencil-alt"></i>
                </button>

                <button class="btn btn-danger" onclick="eliminar({{ $item->id }});">Eliminar</button>
            </td>
        </tr>

        @endforeach


    </tbody>
</table>
