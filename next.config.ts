/** @type {import('next').NextConfig} */
const nextConfig = {
  // Schakel turbopack tijdelijk uit als je problemen hebt
  experimental: {
    // turbo: false // Uncomment bij problemen
  },

  // Zorg dat CSS goed wordt geladen
  transpilePackages: [],

  // Optimalisaties voor Tailwind v4
  // @ts-expect-error: Next.js does not provide a type for the config parameter in the webpack function
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;