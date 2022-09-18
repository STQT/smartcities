/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      "api.smartcities.uz",
      "api.smartcities.uznull",
      "api.smartcities.uzundefined"
    ],
    formats: ["image/avif", "image/webp"]
  }
}

module.exports = nextConfig
