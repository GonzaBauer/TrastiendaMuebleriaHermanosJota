import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import ProductForm from "../components/admin/ProductForm.jsx";
import { getProductoById, updateProducto } from "../service/productoService.js";

function EditarProductoView({ onProductSaved }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      try {
        const detail = await getProductoById(id, controller.signal);

        if (!controller.signal.aborted) {
          setProduct(detail);
        }
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(
            fetchError.message || "Ocurrió un error al cargar el producto.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProduct();
    return () => controller.abort();
  }, [id]);

  async function handleUpdate(producto) {
    await updateProducto(id, producto);
    onProductSaved();
    navigate(`/productos/${id}`);
  }

  return (
    <AdminLayout
      title="Editar producto"
      description="Modifica los datos del producto y guarda los cambios."
    >
      {loading && (
        <p className="py-10 text-center font-brand-sans text-siena" role="status">
          Cargando producto...
        </p>
      )}
      {error && (
        <p className="py-10 text-center font-brand-sans text-siena" role="alert">
          {error}
        </p>
      )}
      {product && (
        <ProductForm
          key={product.id}
          producto={product}
          submitLabel="Guardar cambios"
          submittingLabel="Guardando cambios..."
          onSubmit={handleUpdate}
        />
      )}
    </AdminLayout>
  );
}

export default EditarProductoView;
