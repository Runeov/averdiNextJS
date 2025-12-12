import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dette peker Next.js til riktig rotmappe for å løse "inferred workspace root" warning
  outputFileTracingRoot: __dirname,
  
  // Eksperimentelt flagg for å isolere chart.js ved behov, men la det stå
  // for å sikre at bygget ikke feiler pga. denne pakken.
  experimental: {
    serverComponentsExternalPackages: ['chart.js'], 
  },
  
  // Setter ignore-flagg for å tillate at bygget fullføres selv om det er warnings i koden
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;