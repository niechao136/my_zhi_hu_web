import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    APP_ENV: process.env.NEXT_PUBLIC_APP_ENV
  },
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
  }
};

export default nextConfig;
