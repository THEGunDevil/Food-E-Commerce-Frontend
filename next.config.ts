import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ... your existing config options here ...

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "", 
        pathname: "/**", 
      },
      // Added Cloudinary support below:
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;