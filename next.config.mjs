/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
