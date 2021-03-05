import webpack from 'webpack'
import { merge } from 'webpack-merge'
import getBaseConfig from './baseConfig'

export default (options) => {
  const baseConfig = getBaseConfig(options)
  const { APP_CONFIG } = options

  return merge(baseConfig, {
    devtool: 'eval-cheap-module-source-map',
    output: {
      path: APP_CONFIG[process.env.NODE_ENV].assetsRoot,
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
      publicPath: `http://localhost:${options.port}/`,
    },

    plugins: [
      // new webpack.ProgressPlugin(),
    ],
  })
}
