import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { BackToTop } from "@/components/shared/BackToTop";

// Solo los pesos/estilos que el sitio realmente usa (auditado): evita
// descargar archivos de fuente muertos y mejora el LCP.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "La Guayaba Restaurante | Comida Típica Colombiana en Medellín",
    template: `%s | ${siteConfig.legalName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.legalName,
  keywords: [
    "restaurante Medellín",
    "comida típica colombiana",
    "comida antioqueña",
    "bandeja paisa",
    "restaurante La Guayaba",
    "Avenida Guayabal",
    "eventos y celebraciones",
    "parrilla",
    "comida tradicional",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    // La imagen (og:image) se genera automáticamente desde app/opengraph-image.tsx
    type: "website",
    locale: "es_CO",
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    title: "La Guayaba Restaurante | Comida Típica Colombiana en Medellín",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "La Guayaba Restaurante | Comida Típica Colombiana en Medellín",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  category: "food",
};

export const viewport: Viewport = {
  themeColor: "#fdf9f5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-cream"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </body>
    </html>
  );
}
