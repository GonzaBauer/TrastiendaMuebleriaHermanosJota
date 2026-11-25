import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, loading, role } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main className="flex-1 py-12 text-center font-brand-sans text-siena" role="status">
        Verificando sesión...
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <main className="flex-1 px-5 py-12 text-center">
        <h1 className="font-brand-serif text-3xl text-siena">Acceso denegado</h1>
        <p className="mt-3 text-text">Tu cuenta no tiene permiso para ver esta página.</p>
        <Link className="mt-5 inline-block text-siena underline" to="/">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return children;
}

export default ProtectedRoute;
