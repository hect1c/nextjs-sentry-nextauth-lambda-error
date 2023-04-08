require('dotenv-flow').config({
  path: '../../config/',
  // https://github.com/vercel/next.js/discussions/11106
  // use custom environment due to how Nextjs handles
  // node_env var
  node_env: process.env.NEXT_PUBLIC_BUILD_ENV,
})

const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /src\/.*\/*.(ts|js)x?$/i,
      sideEffects: false,
    })

    return config
  },
  trailingSlash: true,

  /**
   * React's Strict Mode is a development mode only feature for highlighting potential problems in an application.
   * It helps to identify unsafe lifecycles, legacy API usage, and a number of other features.
   * @see https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
   */
  reactStrictMode: true,

  output: 'standalone',
  env: {
    NEXT_PUBLIC_TEST: 'test',
  },
}

const sentryWebpackPluginOptions = {
  debug: false,
  release: 'releaseId',

  // enable if too noisy in console
  silent: true,

  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = async (phase, defaultConfig) => {
  const nextPlugins = [
    // other plugins
    (nConfig) => {
      return withSentryConfig(nConfig, sentryWebpackPluginOptions)
    },
  ]

  const config = nextPlugins.reduce(
    (prev, plugin) => {
      const update = plugin(prev)
      return typeof update === 'function'
        ? update(phase, defaultConfig)
        : update
    },
    { ...nextConfig },
  )

  console.log('config', config)
  return config
}
