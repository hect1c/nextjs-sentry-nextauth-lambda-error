const path = require('path')
require('dotenv-flow').config({
  path: '../../config/',
  // https://github.com/vercel/next.js/discussions/11106
  // use custom environment due to how Nextjs handles
  // node_env var
  node_env: 'develop',
})

const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack, dev, isServer }) => {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(
        /date\-fns[\/\\]/,
        new RegExp(
          `[/\\\\\](${process.env.NEXT_PUBLIC_SUPPORTED_LOCALES})[/\\\\\]index\.js$`,
        ),
      ),
      new webpack.ContextReplacementPlugin(
        /dayjs[\/\\]/,
        new RegExp(
          `[/\\\\\](${(process.env.NEXT_PUBLIC_SUPPORTED_LOCALES || '').replace(
            '-US',
            '',
          )})\.js$`,
        ),
      ),
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false,
      }),
    )

    // @todo removed when replace svg imports
    //       with next image
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer section restricts svg as component only to
      // svgs imported from js / ts files.
      //
      // This allows configuring other behavior for
      // svgs imported from other file types (such as .css)
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: { plugins: [{ removeViewBox: false }] },
          },
        },
      ],
    })

    config.module.rules.push({
      test: /src\/.*\/*.(ts|js)x?$/i,
      sideEffects: false,
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      '@formatjs/icu-messageformat-parser':
        '@formatjs/icu-messageformat-parser/no-parser',
    }

    if (!isServer) {
      config.externals = {
        lodash: '_',
      }
    }

    return config
  },
  trailingSlash: true,

  /**
   * React's Strict Mode is a development mode only feature for highlighting potential problems in an application.
   * It helps to identify unsafe lifecycles, legacy API usage, and a number of other features.
   * @see https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
   */
  reactStrictMode: true,
  experimental: {
    swcPlugins: [
      ['next-superjson-plugin', {}],
      ['swc-plugin-coverage-instrument', {}],
    ],
  },
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

module.exports = nextConfig
// module.exports = withSentryConfiddg(nextConfig, sentryWebpackPluginOptions)
// module.exports = async (phase, { defaultConfig }) => {
//   const nextPlugins = [
//     withBundleAnalyzer,
//     (nConfig) =>
//       withSentryConfig(
//         {
//           ...nConfig,
//           sentry: {
//             excludeServerRoutes: ['/api/auth/[...nextauth]'],
//             widenClientFileUpload: true,
//           },
//         },
//         sentryWebpackPluginOptions,
//       ),
//   ]
//
//   const config = nextPlugins.reduce(
//     (prev, plugin) => {
//       const update = plugin(prev)
//
//       return typeof update === 'function'
//         ? update(phase, defaultConfig)
//         : update
//     },
//     { ...nextConfig },
//   )
//
//   return config
// }
//
