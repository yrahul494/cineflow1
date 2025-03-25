import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['cineflow-bucket.s3.eu-north-1.amazonaws.com'], // Add your image domain here
  },
  devIndicators: false
};

export default nextConfig;
