// 📁 next.config.js - Configuratie
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Experimentele features voor performance
  experimental: {
    scrollRestoration: true,
  },

  // Image optimalisatie instellingen
  images: {
    // Toegestane externe image hosts
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "raw.githubusercontent.com",
    ],

    // Ondersteunde image formaten (moderne formaten eerst)
    formats: ["image/avif", "image/webp"],

    // Toegestane image groottes voor optimalisatie
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Performance optimalisaties
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 jaar cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // Custom loader voor externe CDN (optioneel)
    // loader: 'custom',
    // loaderFile: './src/utils/imageLoader.js',
  },

  // Compiler optimalisaties
  compiler: {
    // Verwijder console.log in productie
    removeConsole: process.env.NODE_ENV === "production",

    // React optimalisaties
    reactRemoveProperties: process.env.NODE_ENV === "production",

    // Styled-components optimalisatie (als gebruikt)
    styledComponents: true,
  },

  // Bundle optimalisaties
  // @ts-expect-error: Next.js does not provide types for these parameters in the config
  webpack: (config, _buildId, dev, isServer) => {
    // Optimaliseer bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          // Vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            priority: 10,
            reuseExistingChunk: true,
          },
          // React libraries
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react",
            priority: 20,
            reuseExistingChunk: true,
          },
          // Framer Motion
          framer: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: "framer-motion",
            priority: 15,
            reuseExistingChunk: true,
          },
          // Common chunks
          common: {
            name: "common",
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },

  // Headers voor performance
  async headers() {
    return [
      // Performance headers
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Security headers
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects voor SEO
  async redirects() {
    return [
      // Voorbeeld redirects voor oude URLs
      {
        source: "/old-portfolio",
        destination: "/#portfolio",
        permanent: true,
      },
    ];
  },

  // PWA en offline ondersteuning (optioneel)
  ...(process.env.NODE_ENV === "production" && {
    // Compression
    compress: true,

    // Static export voor betere performance (optioneel)
    // output: 'export',
    // trailingSlash: true,
  }),

  // Development optimalisaties
  ...(process.env.NODE_ENV === "development" && {
    // Snellere development builds
    typescript: {
      ignoreBuildErrors: false,
    },
    eslint: {
      ignoreDuringBuilds: false,
    },
  }),
};

module.exports = nextConfig;
