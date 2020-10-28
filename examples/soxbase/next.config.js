/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const { PerformanceObserver, performance } = require('perf_hooks')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const IntlPolyfill = require('intl')
const withImages = require('next-images')
const withPWA = require('next-pwa')
const withTM = require('next-transpile-modules')(['@apollo/client', '@reachdigital'])

Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
if (process.versions.node.split('.')[0] > 12) {
  console.warn("'intl' polyfill isn't required anymore")
}

const obs = new PerformanceObserver((entryList) => {
  entryList.getEntries().forEach((item) => {
    console.log(item.name, item.duration)
  })
  performance.clearMarks()
})
obs.observe({ entryTypes: ['measure'] })

const nextConfig = {
  webpackStats: process.env.ANALYZE === 'true',
  experimental: {
    modern: true,
  },
  rewrites() {
    return [{ source: '/sitemap.xml', destination: '/api/sitemap' }]
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: process.env.IMAGE_DOMAINS.split(',').map((s) => s.trim()),
    imageSizes: [16, 32, 64, 128],
  },
}

module.exports = withBundleAnalyzer(withPWA(withImages(withTM(nextConfig))))
