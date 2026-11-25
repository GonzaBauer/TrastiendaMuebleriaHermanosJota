import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import { login, register } from "../service/authService.js";

const inputClassName =
  "mt-2 w-full border border-siena/30 bg-white px-4 py-3 text-text outline-none transition focus:border-siena focus:ring-2 focus:ring-siena/20";

function RegisterView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticate } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setEnviando(true);

    try {
      await register(nombre, email, password);
      const session = await login(email, password);
      authenticate(session.token);
      navigate(location.state?.from || "/", { replace: true });
    } catch (registerError) {
      setError(registerError.message || "No se pudo crear la cuenta.");
      setEnviando(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-12">
      <section className="w-full max-w-md border border-siena/15 bg-white p-7 shadow-surface sm:p-10">
        <header className="mb-8 text-center">
          <h1 className="font-brand-serif text-3xl text-siena">Crear cuenta</h1>
        </header>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre" className="block font-semibold text-siena">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              className={inputClassName}
              required
              maxLength={100}
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold text-siena">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClassName}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold text-siena">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClassName}
              minLength={8}
              maxLength={72}
              required
            />
          </div>
          {error && (
            <p className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={enviando}
            className="w-full bg-siena px-6 py-3 font-semibold uppercase tracking-wider text-white transition hover:bg-siena/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enviando ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-text">
          ¿Ya tenés cuenta?{" "}
          <Link className="text-siena underline" to="/login" state={location.state}>
            Iniciá sesión
          </Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterView;
