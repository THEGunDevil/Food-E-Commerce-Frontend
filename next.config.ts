import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... your existing config options here ...

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "", // optional, leave empty for default
        pathname: "/**", // allows all paths under this hostname
      },
    ],
  },
};

export default nextConfig;