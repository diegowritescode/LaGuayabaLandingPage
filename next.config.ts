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
};

export default nextConfig;
