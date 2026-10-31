import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteProducto } from "../../service/productoService.js";

const actionClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-siena/35 px-4 py-2 font-brand-sans text-xs font-medium uppercase tracking-[0.08em] text-siena no-underline transition-colors hover:bg-siena/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena disabled:cursor-not-allowed disabled:opacity-60";

function ProductAdminActions({ id, name, onDeleted }) {
  const [confirmando, setConfirmando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setError("");
    setEliminando(true);

    try {
      await deleteProducto(id);
      onDeleted(id);
    } catch (deleteError) {
      setError(deleteError.message || "Ocurrió un error al eliminar el producto.");
      setEliminando(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 border-t border-siena/25 pt-4">
      {confirmando ? (
        <>
          <p className="font-brand-sans text-sm text-text">
            ¿Eliminar {name}? Esta acción no se puede deshacer.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              className={actionClassName}
              disabled={eliminando}
              onClick={handleDelete}
              type="button"
            >
              <Trash2 aria-hidden="true" className="h-4 w-4" />
              {eliminando ? "Eliminando..." : "Sí, eliminar"}
            </button>
            <button
              className={actionClassName}
              disabled={eliminando}
              onClick={() => setConfirmando(false)}
              type="button"
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-3">
          <Link className={actionClassName} to={`/admin/editar-producto/${id}`}>
            <Pencil aria-hidden="true" className="h-4 w-4" /> Editar
          </Link>
          <button
            className={actionClassName}
            onClick={() => setConfirmando(true)}
            type="button"
          >
            <Trash2 aria-hidden="true" className="h-4 w-4" /> Eliminar
          </button>
        </div>
      )}
      {error && (
        <p
          className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default ProductAdminActions;
