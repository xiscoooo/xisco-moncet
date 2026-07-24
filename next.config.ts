import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this repo (a stray lockfile in the home dir
  // was making Next infer the wrong root).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
