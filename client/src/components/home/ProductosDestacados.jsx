import { useState, useEffect } from "react";

function ProductosDestacados() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/productos/destacados")
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
          <div
            key={producto.id}
            className="group flex aspect-[3/4] flex-col overflow-hidden rounded-2xl border border-[#D4A348] bg-gradient-to-b from-[#F3EADB] via-[#EFE5D3] to-[#E6D5BB] shadow-[0_4px_20px_rgba(160,82,45,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-[70%] w-full shrink-0 items-center justify-center overflow-hidden p-5">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 pb-5 text-center">
              <h3 className="font-serif uppercase text-[#8B4513]">
                {producto.nombre}
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#A0522D]">
                Ver detalle →
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductosDestacados;