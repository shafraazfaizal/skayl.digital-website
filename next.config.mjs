/** @type {import('next').NextConfig} */

// Private pages: never indexed, never cached, never leak the link in a referrer.
const privateHeaders = [
  { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
  { key: "Cache-Control", value: "no-store" },
  { key: "Referrer-Policy", value: "no-referrer" },
];

const nextConfig = {
  async redirects() {
    return [
      { source: "/works/zero-excuses", destination: "/works", permanent: true },
      { source: "/blog/why-we-produce-content-without-music", destination: "/blog", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/discovery/:path*", headers: privateHeaders },
      { source: "/admin/:path*", headers: privateHeaders },
      { source: "/auth/:path*", headers: privateHeaders },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "framerusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // The Discovery PDF is built on the server with @react-pdf/renderer.
  serverExternalPackages: ["@react-pdf/renderer"],
  // Ship the PDF fonts with the functions that build PDFs.
  outputFileTracingIncludes: {
    "/api/discovery/submit": ["./src/lib/discovery/pdf/fonts/**/*"],
    "/admin/discovery/[id]": ["./src/lib/discovery/pdf/fonts/**/*"],
  },
};

export default nextConfig;
