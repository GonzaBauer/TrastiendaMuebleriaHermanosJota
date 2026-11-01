function AdminLayout({ title, description, children }) {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[1000px] px-[5rem] py-12">
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
