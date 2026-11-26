import { Link } from "react-router-dom";

function NotFoundView() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-alabastro px-5 py-16 text-center">
      <p className="font-brand-sans text-xs font-semibold uppercase tracking-[0.12em] text-siena">
        Error 404
      </p>
      <h1 className="mt-3 font-brand-serif text-3xl uppercase tracking-[0.08em] text-siena sm:text-4xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md font-brand-sans text-base text-text">
        La dirección que buscás no existe o fue movida.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex min-h-12 items-center justify-center bg-siena px-6 py-3 font-brand-sans text-sm font-semibold uppercase tracking-wider text-white no-underline transition hover:bg-siena/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
        >
          Ir al inicio
        </Link>
        <Link
          to="/productos"
          className="inline-flex min-h-12 items-center justify-center border border-siena/35 px-6 py-3 font-brand-sans text-sm font-semibold uppercase tracking-wider text-siena no-underline transition hover:bg-siena/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
        >
          Ver catálogo
        </Link>
      </div>
    </main>
  );
}

export default NotFoundView;
