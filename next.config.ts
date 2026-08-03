import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Klijent gleda dev server uživo — nikakav Next.js badge ne smije biti u kadru.
  devIndicators: false,
};

export default nextConfig;
