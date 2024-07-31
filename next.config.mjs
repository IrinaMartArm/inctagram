/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['summer.storage.yandexcloud.net'],
    remotePatterns: [
      {
        hostname: "",
        pathname: "",
        port: "",
        protocol: "https",

        
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
