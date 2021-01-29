const WebpackDevServer = require('webpack-dev-server')
const Webpack = require('webpack')
const openBrowser = require('react-dev-utils/openBrowser')
const address = require('address')
const portfinder = require('portfinder')
const chalk = require('chalk')

export default async (webpackConfig, options) => {
  const { target } = options.APP_CONFIG
  const { port: basePort = 3000 } = options
  const host = 'localhost'

  portfinder.basePort = basePort
  const port = await portfinder.getPortPromise()

  const {
    proxy = [
      {
        target,
        pathRewrite: {
          '^/api/': '/',
        },
        changeOrigin: true
      },
    ]
  } = options.APP_CONFIG

  // 热更新
  webpackConfig.entry.unshift(require.resolve('webpack/hot/dev-server'))
  webpackConfig.entry.unshift(
    `${require.resolve('webpack-dev-server/client')}?http://${host}:${port}/sockjs-node`,
  )

  const devServerOptions = {
    clientLogLevel: 'silent',
    hot: true,
    host,
    disableHostCheck: true,
    historyApiFallback: true,
    port,
    overlay: { warnings: false, errors: true },
    proxy,
    noInfo: true,
  }
  const compiler = Webpack(webpackConfig)
  const server = new WebpackDevServer(compiler, devServerOptions)

  let isFirstCompile = true

  compiler.hooks.done.tap('goodpack dev', stats => {
    if (stats.hasErrors()) {
      return
    }

    if (isFirstCompile) {
      console.log()
      console.log('  App 运行:')
      console.log(`  - 本地: ${chalk.magenta(`http://localhost:${chalk.cyan(port)}/`)}`)
      console.log(`  - 局域网: ${chalk.magenta(`http://${address.ip()}:${chalk.cyan(port)}/`)}`)
      console.log()
      isFirstCompile = false
    }
  })

  server.listen(port, host, err => {
    if (err) {
      return console.error(err)
    }
    openBrowser(`http://localhost:${port}`)
  })
}
