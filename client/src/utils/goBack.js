// Vuelve a la página anterior de la app; si se entró directo por la URL, va a `fallback`.
export default function goBack(navigate, fallback) {
  if (window.history.state?.idx > 0) {
    navigate(-1);
  } else {
    navigate(fallback, { replace: true });
  }
}
