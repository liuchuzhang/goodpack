const VueLoaderPlugin = require('vue-loader/lib/plugin')
const merge = require('webpack-merge')
const { hasTsConfig } = require('../lib/utils')

module.exports = (options) => {
  const webpackConfig = {
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: file => (
            /node_modules/.test(file) &&
            !/\.vue\.js/.test(file)
          )
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            hotReload: true,
            transformAssetUrls: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: ['xlink:href', 'href'],
              use: ['xlink:href', 'href']
            }
          }
        },
        {
        test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                // TODO: https://vue-loader.vuejs.org/guide/pre-processors.html#sharing-global-variables
                additionalData: `$test: red;`,
                // enable CSS Modules
                modules: true,
                // customize generated class names
                localIdentName: '[local]_[hash:base64:8]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // make sure to include the plugin!
      new VueLoaderPlugin()
    ]
  }

  if (hasTsConfig(options.APP_CONFIG.tsConfigPath)) {
    merge(webpackConfig, {
      module: {
          rules: [
            {
              test: /\.ts$/,
              loader: 'ts-loader',
              options: { appendTsSuffixTo: [/\.vue$/] }
            }
          ]
        }
    })
  }

  return webpackConfig
}