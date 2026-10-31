import { useState } from "react";
import getProductImage from "../../utils/getProductImage.js";

const categorias = [
  { value: "comedor", label: "Comedor" },
  { value: "sala", label: "Sala" },
  { value: "trabajo", label: "Trabajo" },
  { value: "dormitorio", label: "Dormitorio" },
  { value: "mesa", label: "Mesa" },
  { value: "almacenamiento", label: "Almacenamiento" },
];

const inputClassName =
  "mt-2 w-full border border-siena/30 bg-white px-4 py-3 text-text outline-none transition focus:border-siena focus:ring-2 focus:ring-siena/20";
const labelClassName = "block font-semibold text-siena";

function ProductForm({ producto = {}, submitLabel, submittingLabel, onSubmit }) {
  const [nombre, setNombre] = useState(producto.nombre ?? "");
  const [categoria, setCategoria] = useState(
    producto.categoria?.toLowerCase() ?? "",
  );
  const [descripcion, setDescripcion] = useState(producto.descripcion ?? "");
  const [precio, setPrecio] = useState(producto.precio ?? "");
  const [stock, setStock] = useState(producto.stock ?? "");
  const [imagenUrl, setImagenUrl] = useState(getProductImage(producto) ?? "");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setEnviando(true);

    try {
      await onSubmit({
        nombre,
        categoria,
        descripcion,
        precio: Number(precio),
        stock: stock === "" ? undefined : Number(stock),
        imagenUrl,
      });
    } catch (submitError) {
      setError(submitError.message || "Ocurrió un error al guardar el producto.");
      setEnviando(false);
    }
  }

  return (
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
        <label htmlFor="categoria" className={labelClassName}>
          Categoría *
        </label>
        <select
          id="categoria"
          name="categoria"
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
          className={inputClassName}
          required
        >
          <option value="">Seleccioná una categoría</option>
          {categorias.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
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
          type="text"
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
        {enviando ? submittingLabel : submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;
