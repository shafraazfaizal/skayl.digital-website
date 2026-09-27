/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/works/zero-excuses", destination: "/works", permanent: true }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
