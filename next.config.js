// const withPWA = require("@ducanh2912/next-pwa").default({
//   dest: "public",
//   disable: false,
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {},
  eslint: {
    ignoreBuildErrors: true,
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            dimensions: false,
            replaceAttrValues: { "#000": "currentColor" },
          },
        },
      ],
    });

    return config;
  },
};

// module.exports = withPWA(nextConfig);
module.exports = nextConfig;
