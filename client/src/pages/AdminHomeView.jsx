import { Link } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout.jsx";

function AdminHomeView() {
  return (
    <AdminLayout
      title="Gestión del sitio"
      description="Administrá el catálogo y los productos de Hermanos Jota."
    >
      <div className="flex flex-col items-center gap-4">
        <Link
          to="/admin/crear-producto"
          className="inline-flex min-h-12 items-center justify-center bg-siena px-6 py-3 font-semibold uppercase tracking-wider text-white transition hover:bg-siena/90"
        >
          Agregar producto
        </Link>
        <Link
          to="/productos"
          className="inline-flex min-h-12 items-center justify-center border border-siena/35 px-6 py-3 font-semibold uppercase tracking-wider text-siena transition hover:bg-siena/10"
        >
          Administrar catálogo
        </Link>
      </div>
    </AdminLayout>
  );
}

export default AdminHomeView;
