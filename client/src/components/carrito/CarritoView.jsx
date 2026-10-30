import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import formatPrice from "../../utils/formatPrice.js";

function CarritoView({ cart, onChangeQuantity, onRemove, onClear }) {
  const total = cart.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0,
  );

  return (
    <main className="min-w-0 flex-1 bg-alabastro px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 border-b border-siena/25 pb-6 font-brand-serif text-3xl uppercase tracking-[0.1em] text-siena">
            Tu carrito
          </h1>

          {cart.length === 0 ? (
            <div className="py-12 text-center font-brand-sans text-text">
              <p className="mb-6">Tu carrito está vacío.</p>
              <Link
                to="/productos"
                className="inline-flex min-h-12 items-center rounded-sm bg-siena px-6 py-3 font-medium text-alabastro hover:bg-siena/90 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-vara"
              >
                Explorar el catálogo
              </Link>
            </div>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center gap-4 border-b border-siena/20 py-5 first:border-t"
                  >
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      width="80"
                      height="80"
                      className="h-20 w-20 bg-white/60 object-contain p-2"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-brand-serif text-lg uppercase text-siena">
                        {item.nombre}
                      </p>
                      <p className="font-brand-sans text-sm text-text">
                        $ {formatPrice(item.precio)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(item.id, -1)}
                        className="inline-flex h-11 w-11 items-center justify-center border border-siena/35 text-siena focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
                        aria-label={`Quitar una unidad de ${item.nombre}`}
                      >
                        <Minus aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <span
                        className="w-8 text-center font-brand-sans tabular-nums text-text"
                        aria-live="polite"
                      >
                        {item.cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={() => onChangeQuantity(item.id, 1)}
                        className="inline-flex h-11 w-11 items-center justify-center border border-siena/35 text-siena focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
                        aria-label={`Agregar una unidad de ${item.nombre}`}
                      >
                        <Plus aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="w-28 text-right font-brand-sans font-semibold tabular-nums text-siena">
                      $ {formatPrice(item.precio * item.cantidad)}
                    </p>
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="inline-flex min-h-11 items-center gap-2 px-2 font-brand-sans text-sm text-siena underline underline-offset-4 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
                      aria-label={`Quitar ${item.nombre} del carrito`}
                    >
                      <Trash2 aria-hidden="true" className="h-4 w-4" /> Quitar
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-siena/25 pt-6">
                <button
                  type="button"
                  onClick={onClear}
                  className="inline-flex min-h-11 items-center px-2 font-brand-sans text-sm text-siena underline underline-offset-4 hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
                >
                  Vaciar carrito
                </button>
                <p className="font-brand-serif text-2xl text-siena">
                  Total: $ {formatPrice(total)}
                </p>
              </div>
            </>
          )}
        </div>
    </main>
  );
}

export default CarritoView;
