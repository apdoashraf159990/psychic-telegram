/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // Owner control page should not appear in layout with Navbar/Footer
  experimental: {},
};

export default nextConfig;
