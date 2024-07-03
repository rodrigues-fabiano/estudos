/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: "/es/acerca",
        destination: "/es/about"
      },
      {
        source: "/pt/sobre",
        destination: "/pt/about"
      },
    ];
  },
};

export default nextConfig;
