/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['summer.storage.yandexcloud.net'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "",
        port: "",
        pathname: "",
      },
    ],
  },
};

export default nextConfig;
