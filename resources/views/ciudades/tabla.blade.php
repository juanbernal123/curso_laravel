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
            <td></td>
        </tr>

        @endforeach


    </tbody>
</table>
