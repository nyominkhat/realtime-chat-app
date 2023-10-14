/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
    ],
  },
  experimental: {
    appDir: true,
    swcPlugins: [["next-superjson-plugin", {}]],
  },
};

module.exports = nextConfig;
