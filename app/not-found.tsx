import { Home, UtensilsCrossed } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden bg-cream px-5 py-32">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-guayaba/10 blur-3xl" aria-hidden="true" />

      <div className="relative flex flex-col items-center text-center">
        <Logo variant="stacked" className="h-24" />
        <p className="mt-10 font-serif text-7xl font-semibold text-guayaba sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-3xl text-brown sm:text-4xl">
          Esta página no está en la carta
        </h1>
        <p className="mt-4 max-w-md text-brown-soft/85">
          Parece que el enlace que buscas se enfrió. Volvamos a lo bueno: nuestra
          mesa y nuestra cocina te esperan.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="lg" icon={<Home className="h-5 w-5" />}>
            Volver al inicio
          </Button>
          <Button
            href="/menu"
            variant="outline"
            size="lg"
            icon={<UtensilsCrossed className="h-5 w-5" />}
          >
            Ver la carta
          </Button>
        </div>
      </div>
    </section>
  );
}
