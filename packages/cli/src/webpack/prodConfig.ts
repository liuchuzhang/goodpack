import webpack from 'webpack'
import { merge } from 'webpack-merge'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import getBaseConfig from './baseConfig'

export default (options) => {
  const baseConfig = getBaseConfig(options)
  const { APP_CONFIG } = options

  return merge(baseConfig, {
    devtool: APP_CONFIG[process.env.NODE_ENV].productionSourceMap ? 'source-map' : false,
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
      minimizer: [
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true,
          },
        }),
        new TerserPlugin({
          terserOptions: {
            compress: {
              // turn off flags with small gains to speed up minification
              arrows: false,
              collapse_vars: false, // 0.3kb
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,

              // a few flags with noticable gains/speed ratio
              // numbers based on out of the box vendor bundle
              booleans: true, // 0.7kb
              if_return: true, // 0.4kb
              sequences: true, // 0.7kb
              unused: true, // 2.3kb

              // required features to drop conditional branches
              conditionals: true,
              dead_code: true,
              evaluate: true,
            },
            mangle: {
              safari10: true,
            },
          },
          parallel: true,
        }),
      ],
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),

      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 10000, // Minimum number of characters
      }),
    ],

    output: {
      path: APP_CONFIG[process.env.NODE_ENV].assetsRoot,
      // TODO: assetsPath
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[chunkhash].js',
      publicPath: APP_CONFIG[process.env.NODE_ENV].assetsPublicPath,
    },

    stats: {
      cached: false,
      cachedAssets: false,
    },
  })
}
