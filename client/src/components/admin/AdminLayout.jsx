import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import goBack from "../../utils/goBack.js";

function AdminLayout({ title, description, children, showBackButton = true }) {
  const navigate = useNavigate();

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[1000px] px-[5rem] py-12">
        {showBackButton && (
          <button
            type="button"
            onClick={() => goBack(navigate, "/admin")}
            className="mb-6 inline-flex min-h-11 items-center gap-2 border border-siena/35 px-4 py-2 font-brand-sans text-xs font-medium uppercase tracking-[0.08em] text-siena no-underline transition-colors hover:bg-siena/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-siena"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Volver
          </button>
        )}
        <header className="mb-8 text-center">
          <p className="mb-3 font-brand-sans text-xs font-semibold uppercase tracking-[0.12em] text-siena">
            Administración
          </p>
          <h1 className="font-brand-serif text-3xl uppercase tracking-[0.08em] text-siena sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-text-light">{description}</p>
        </header>
        {children}
      </section>
    </main>
  );
}

export default AdminLayout;
