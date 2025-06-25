/** @type {import('next').NextConfig} */
const nextConfig = {
  // Schakel turbopack tijdelijk uit als je problemen hebt
  experimental: {
    // turbo: false // Uncomment bij problemen
  },

  // Zorg dat CSS goed wordt geladen
  transpilePackages: [],

  // Optimalisaties voor Tailwind v4
  webpack: (config: import('webpack').Configuration) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;