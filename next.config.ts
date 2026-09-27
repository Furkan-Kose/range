import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proje, üst dizindeki başka bir package-lock ile karışmasın
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    // Vimeo / YouTube video kapak görselleri (referans detay sayfası)
    remotePatterns: [
      { protocol: "https", hostname: "i.vimeocdn.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  allowedDevOrigins: ['192.168.68.105'],
};

export default nextConfig;
