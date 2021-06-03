/* eslint-disable @typescript-eslint/no-var-requires */

const withGraphCommerce = require('@reachdigital/next-config').withYarn1Workspaces()

module.exports = withGraphCommerce({
  experimental: {
    scrollRestoration: true,
  },
  future: {
    webpack5: true,
  },
})
