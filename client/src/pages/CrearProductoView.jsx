import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import ProductForm from "../components/admin/ProductForm.jsx";
import { createProducto } from "../service/productoService.js";

function CrearProductoView({ onProductSaved }) {
  const navigate = useNavigate();

  async function handleCreate(producto) {
    await createProducto(producto);
    onProductSaved();
    navigate("/productos");
  }

  return (
    <AdminLayout
      title="Alta de producto"
      description="Completa los datos para agregar un producto al catálogo."
    >
      <ProductForm
        submitLabel="Crear producto"
        submittingLabel="Creando producto..."
        onSubmit={handleCreate}
      />
    </AdminLayout>
  );
}

export default CrearProductoView;
