import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Las fotos placeholder viven en Unsplash. Al reemplazarlas por las
    // fotografías reales del restaurante (en /public/images) puedes quitar
    // este remotePatterns por completo.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  /**
   * Ruta corta y estable para el QR impreso de la carta. El QR apunta a /carta
   * (nunca cambia); aquí decidimos a dónde lleva. Si algún día mueves o renombras
   * la carta, cambias solo este destino y NO hay que reimprimir el QR.
   * Los UTM permiten medir los escaneos en la analítica. permanent: false (307)
   * para que el navegador no cachee el destino de forma permanente.
   */
  async redirects() {
    return [
      {
        source: "/carta",
        destination: "/menu?utm_source=qr&utm_medium=print&utm_campaign=carta_qr",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
