import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents: true,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "floralboutique.in",
      },
      {
        protocol: "https",
        hostname: "dev.floralboutique.in",
      },
      {
        protocol: "https",
        hostname: "api.floralboutique.in",
      },
      {
        protocol: "http",
        hostname: "192.168.88.70",
      },
    ],
    // Vercel Hobby (free) plan
    unoptimized: true,

    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=31536000, immutable, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
