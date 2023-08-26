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
})

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

module.exports = withPWA(withVanillaExtract(nextConfig))
