/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // basePath: '/vanilla-extract-sample',
  // distDir: 'out/vanilla-extract-sample',
  trailingSlash: true,
  // images: {
  //   unoptimized: true,
  // },
}

const withPWA = require('next-pwa')({
  dest: 'public',
  buildExcludes: ['app-build-manifest.json'],
  // デフォルトのキャッシュ戦略: https://github.com/shadowwalker/next-pwa/blob/master/cache.js
  runtimeCaching: [{ handler: 'NetworkOnly', urlPattern: /.*/ }],
  disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'servicef-worker.js',
})

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

module.exports = withPWA(withVanillaExtract(nextConfig))
