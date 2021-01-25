const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { merge } = require('webpack-merge')
const { resolveProjectPath, transformer, formatter, hasTsConfig } = require('../lib/utils')
const resolveEntry = require('../lib/resolveEntry')
const getVueConfig = require('./vue')
// const getVue3Config = require('./vue3')
// const getReactConfig = require('./react')

module.exports = options => {
  const isDev = process.env.NODE_ENV === 'development'
  const { APP_CONFIG } = options

  const styleRules = [
    {
      loader: 'css-loader',
      options: {
        modules: {
          css: /\.css$/,
          localIdentName: '[local]_[hash:base64:6]',
        },
      },
    },
  ]

  let webpackConfig = {
    mode: process.env.NODE_ENV,

    entry: [resolveEntry()],

    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {},
            },
          ]
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            // TODO: assetsPath
            name: 'fonts/[name].[hash:7].[ext]',
            publicPath: APP_CONFIG[process.env.NODE_ENV].cssAssetsPath,
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                // TODO: assetsPath
                name: 'img/[name].[hash:7].[ext]',
                publicPath: APP_CONFIG[process.env.NODE_ENV].cssAssetsPath,
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['sass-loader'],
        },
      ],
    },

    plugins: [
      new CaseSensitivePathsPlugin(),

      new HtmlWebpackPlugin({
        template: 'src/template.html',
        filename: 'index.html',
        title: APP_CONFIG.title,
        minify: {
          removeComments: true, // 删除注释
          collapseWhitespace: true, // 压缩成一行
          removeAttributeQuotes: false, // 删除引号
        },
      }),

      new FriendlyErrorsWebpackPlugin({
        additionalTransformers: [transformer],
        additionalFormatters: [formatter],
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.vue', '.tsx', '.ts', '.jsx', '.js', '.scss', '.css'],
      alias: {
        ...Object.entries(APP_CONFIG.alias).reduce(
          (object, [alias, path]) => ({
            ...object,
            [alias]: resolveProjectPath(path),
          }),
          {}
        ),
      },
      modules: ['node_modules', resolveProjectPath('node_modules')],
    },
    resolveLoader: {
      modules: ['node_modules', resolveProjectPath('node_modules')],
    },
  }

  if (hasTsConfig(APP_CONFIG.tsConfigPath)) {
    const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
    webpackConfig = merge(webpackConfig, {
      module: {
        rules: [
          {
            test: /\.ts[x]?$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
                },
              },
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  happyPackMode: true,
                  configFile: resolveProjectPath('tsconfig.json'),
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new ForkTsCheckerWebpackPlugin({
          typescript: {
            context: resolveProjectPath(),
            configFile: resolveProjectPath('tsconfig.json'),
          },
        }),
      ],
    })
  }
  
  let frameworkWebpackConfig
  switch(options.framework) {
    case 'react':
      break
    case 'vue3':
      break
    default:
      // default vue
      frameworkWebpackConfig = getVueConfig(options)
      break
  }

  return merge(webpackConfig, frameworkWebpackConfig)
}
