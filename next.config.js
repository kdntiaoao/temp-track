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

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

module.exports = withVanillaExtract(nextConfig)
