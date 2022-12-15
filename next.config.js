/** @type {import('next').NextConfig} */

const nextConfig = {
  api: {
    bodyParser: true,
  },
  webpack: (config, { nextRuntime }) => {
    // Undocumented property of next 12.
    if (nextRuntime !== "nodejs") return config;
    return {
      ...config,
      entry() {
        return config.entry().then((entry) => ({
          ...entry,
          cli: path.resolve(process.cwd(), "lib/cli.ts"),
        }));
      },
    };
  },
  server: {
    maxPayload: 50485760 // 50MB
  },
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'bitsroad.s3.amazonaws.com'],
  },
  
}

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

module.exports = {nextConfig, withMDX}