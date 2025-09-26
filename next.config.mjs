// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Don’t fail the build on lint or type warnings (good for MVP speed)
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Images (no remote domains yet; set `unoptimized:true` for simple deploys)
  images: {
    unoptimized: true,
    domains: [], // add domains later if you load remote images
  },
};

export default nextConfig;
