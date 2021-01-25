const webpack = require('webpack')
const { merge } = require('webpack-merge')
const getBaseConfig = require('./baseConfig')

module.exports = (options) => {
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
      new webpack.ProgressPlugin(),
    ],
  })
}
