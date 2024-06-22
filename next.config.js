const path = require('path')

module.exports = {
  extends: ['plugin:@next/next/recommended'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
const nextConfig = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
  },
  images: {
    domains: ['summer.storage.yandexcloud.net'],
    remotePatterns: [
      {
        hostname: 'example.com',
        pathname: '/account123/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
}

module.exports = nextConfig
