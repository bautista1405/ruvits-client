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
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'bitsroad.s3.amazonaws.com'],
  },
  
}

module.exports = nextConfig