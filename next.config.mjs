/** @type {import('next').NextConfig} */
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;

const nextConfig = {
  images: {
    remotePatterns: cloudinaryCloudName
      ? [
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
            pathname: `/${cloudinaryCloudName}/image/upload/**`,
          },
        ]
      : [],
  },
  turbopack: {
    rules: {
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
