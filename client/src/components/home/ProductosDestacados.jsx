import { useState, useEffect } from "react";
import ProductCard from "../ProductCard";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
).replace(/\/+$/, "");

function ProductosDestacados() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/productos/destacados`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudieron cargar los productos");
        }
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []); 

  if (cargando) {
    return (
      <p className="text-center text-[#A0522D] py-10">
        Cargando productos...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 py-10">
        Ocurrió un error: {error}
      </p>
    );
  }

  return (
    <section className="bg-alabastro px-4 py-16 sm:px-6 lg:px-8">
      <div className="group/title mx-auto flex w-fit flex-col items-center">
        <h2 className="text-center text-3xl font-serif uppercase tracking-widest text-[#A0522D] transition-[text-shadow] duration-300 group-hover/title:[text-shadow:0_0_12px_rgba(212,163,72,0.45)]">
          Productos Destacados
        </h2>
        <span className="mt-3 h-px w-14 bg-[#D4A348] transition-all duration-300 group-hover/title:w-24" />
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((producto) => (
          <ProductCard producto={producto} key={producto.id} />
        ))}
      </div>
    </section>
  );
}

export default ProductosDestacados;