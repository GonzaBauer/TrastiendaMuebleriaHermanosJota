import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import { login } from "../service/authService.js";

const inputClassName =
  "mt-2 w-full border border-siena/30 bg-white px-4 py-3 text-text outline-none transition focus:border-siena focus:ring-2 focus:ring-siena/20";

function LoginView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticate } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setEnviando(true);

    try {
      const session = await login(email, password);
      authenticate(session.token);
      navigate(
        location.state?.from || (session.user?.role === "admin" ? "/admin" : "/"),
        { replace: true },
      );
    } catch (loginError) {
      setError(loginError.message || "No se pudo iniciar sesión.");
      setEnviando(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-12">
      <section className="w-full max-w-md border border-siena/15 bg-white p-7 shadow-surface sm:p-10">
        <Link to="/" className="mx-auto mb-6 block h-16 w-16">
          <img
            className="h-full w-full object-contain"
            src="/images/logo.svg"
            alt="Hermanos Jota"
          />
        </Link>
        <header className="mb-8 text-center">
          <h1 className="font-brand-serif text-3xl text-siena">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-text-light">
            Ingresá tus datos para continuar.
          </p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
            <label
              htmlFor="password"
              className="block font-semibold text-siena"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClassName}
              required
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
            {enviando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-text">
          ¿Todavía no tenés cuenta?{" "}
          <Link className="text-siena underline" to="/registro" state={location.state}>
            Registrate
          </Link>
        </p>
      </section>
    </main>
  );
}

export default LoginView;
