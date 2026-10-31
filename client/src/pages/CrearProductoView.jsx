import { useState } from "react";
import { useNavigate } from "react-router-dom";

async function readResponse(response) {
  const body = await response.text();

  if (!body) {
    return null;
  }

  try {
    return JSON.parse(body);
  } catch {
    return { message: body };
  }
}

function getErrorMessage(data, status) {
  if (typeof data?.message === "string" && data.message) {
    return data.message;
  }

  if (typeof data?.error === "string" && data.error) {
    return data.error;
  }

  if (Array.isArray(data?.errors)) {
    const messages = data.errors
      .map((error) =>
        typeof error === "string" ? error : error?.message || error?.msg,
      )
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return `No se pudo crear el producto (HTTP ${status}).`;
}

function CrearProductoView() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setEnviando(true);

    try {
      const response = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio: Number(precio),
          stock: stock === "" ? undefined : Number(stock),
          imagenUrl,
        }),
      });
      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(getErrorMessage(data, response.status));
      }

      navigate("/productos");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Ocurrió un error al crear el producto.",
      );
    } finally {
      setEnviando(false);
    }
  }

  const inputClassName =
    "mt-2 w-full border border-siena/30 bg-white px-4 py-3 text-text outline-none transition focus:border-siena focus:ring-2 focus:ring-siena/20";
  const labelClassName = "block font-semibold text-siena";

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[1000px] px-[5rem] py-12">
        <header className="mb-8 text-center">
          <p className="mb-3 font-brand-sans text-xs font-semibold uppercase tracking-[0.12em] text-siena">
            Administración
          </p>
          <h1 className="font-brand-serif text-3xl uppercase tracking-[0.08em] text-siena sm:text-4xl">
            Alta de producto
          </h1>
          <p className="mt-3 text-text-light">
            Completa los datos para agregar un producto al catálogo.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-4 w-full max-w-[480px] space-y-6 rounded-lg border border-alabastro bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
        >
          <div>
            <label htmlFor="nombre" className={labelClassName}>
              Nombre *
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              className={inputClassName}
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label htmlFor="descripcion" className={labelClassName}>
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              className={inputClassName}
              rows={4}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="precio" className={labelClassName}>
                Precio *
              </label>
              <input
                id="precio"
                name="precio"
                type="number"
                min="0"
                step="0.01"
                value={precio}
                onChange={(event) => setPrecio(event.target.value)}
                className={inputClassName}
                required
              />
            </div>

            <div>
              <label htmlFor="stock" className={labelClassName}>
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                className={inputClassName}
              />
            </div>
          </div>

          <div>
            <label htmlFor="imagenUrl" className={labelClassName}>
              URL de la imagen
            </label>
            <input
              id="imagenUrl"
              name="imagenUrl"
              type="url"
              value={imagenUrl}
              onChange={(event) => setImagenUrl(event.target.value)}
              className={inputClassName}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {error && (
            <p
              className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="w-full bg-siena px-6 py-3 font-semibold uppercase tracking-wider text-white transition hover:bg-siena/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enviando ? "Creando producto..." : "Crear producto"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default CrearProductoView;
