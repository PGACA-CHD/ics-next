/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export compatibility
  trailingSlash: false,
  // Image domains for any future use
  images: {
    domains: ['images.ctfassets.net'],
  },
  // Suppress powered-by header
  poweredByHeader: false,
};

module.exports = nextConfig;
