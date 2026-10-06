import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sample catalogue photography. Replace with the real asset host later.
    // Object form: the URL form also pins the query string, which Unsplash sizing needs.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
