<!-- Modal -->
<div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Ciudad</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="" method="post">
                    @include('ciudades.form')
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary" id="btn_actualizar">
                    <i class="fas fa-save"></i>
                    Guardar
                </button>
            </div>
        </div>
    </div>
</div>
