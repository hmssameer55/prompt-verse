/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose']
  },
  images: {
    domains: ['localhost:3000', 'lh3.googleusercontent.com']
  },
  webpack: config => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true
    }
    return config
  },
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig
