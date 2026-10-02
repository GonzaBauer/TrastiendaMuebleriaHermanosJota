import { AtSign, Clock3, Mail, MapPin, MessageCircle } from "lucide-react";

function Footer() {
  return (
    <footer
      className="mt-auto w-full bg-siena px-page py-6 text-alabastro sm:py-8"
      id="contacto"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-6 border-b border-alabastro/25 pb-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
          <section aria-labelledby="footer-showroom">
            <h2
              id="footer-showroom"
              className="mb-3 font-brand-serif text-lg uppercase tracking-[0.06em]"
            >
              Casa Taller
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              <address className="flex gap-3 font-brand-sans text-sm not-italic leading-relaxed text-alabastro/90">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0"
                />
                <span>
                  Av. San Juan 2847
                  <br />
                  C1232AAB · Barrio de San Cristóbal
                  <br />
                  Ciudad Autónoma de Buenos Aires
                </span>
              </address>
              <p className="flex gap-3 font-brand-sans text-sm leading-relaxed text-alabastro/90">
                <Clock3
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0"
                />
                <span>
                  Lunes a viernes: 10:00–19:00
                  <br />
                  Sábados: 10:00–14:00
                </span>
              </p>
            </div>
          </section>
          <section aria-labelledby="footer-contact">
            <h2
              id="footer-contact"
              className="mb-2 font-brand-serif text-lg uppercase tracking-[0.06em]"
            >
              Contacto
            </h2>
            <ul className="grid gap-x-6 sm:grid-cols-2">
              <li>
                <a
                  className="inline-flex min-h-11 items-center gap-3 font-brand-sans text-sm text-alabastro/90 underline decoration-alabastro/40 underline-offset-4 transition-colors hover:text-alabastro hover:decoration-alabastro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alabastro"
                  href="mailto:info@hermanosjota.com.ar"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                  info@hermanosjota.com.ar
                </a>
              </li>
              <li>
                <a
                  className="inline-flex min-h-11 items-center gap-3 font-brand-sans text-sm text-alabastro/90 underline decoration-alabastro/40 underline-offset-4 transition-colors hover:text-alabastro hover:decoration-alabastro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alabastro"
                  href="mailto:ventas@hermanosjota.com.ar"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                  ventas@hermanosjota.com.ar
                </a>
              </li>
              <li>
                <a
                  className="inline-flex min-h-11 items-center gap-3 font-brand-sans text-sm text-alabastro/90 underline decoration-alabastro/40 underline-offset-4 transition-colors hover:text-alabastro hover:decoration-alabastro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alabastro"
                  href="https://wa.me/541145678900"
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0"
                  />
                  +54 11 4567-8900
                </a>
              </li>
              <li>
                <a
                  className="inline-flex min-h-11 items-center gap-3 font-brand-sans text-sm text-alabastro/90 underline decoration-alabastro/40 underline-offset-4 transition-colors hover:text-alabastro hover:decoration-alabastro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alabastro"
                  href="https://www.instagram.com/hermanosjota_ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AtSign aria-hidden="true" className="h-4 w-4 shrink-0" />
                  @hermanosjota_ba
                </a>
              </li>
            </ul>
          </section>
        </div>
        <p className="pt-4 font-brand-sans text-xs leading-relaxed text-alabastro/80">
          © 2026 Hermanos Jota. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
