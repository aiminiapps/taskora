/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      // Wagmi optional dependencies not installed — stub them for Turbopack
      accounts: "./src/lib/empty-module.js",
    },
  },
};

export default nextConfig;
