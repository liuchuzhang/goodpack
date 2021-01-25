const { resolveProjectPath } = require('./lib/utils')
const getDevConfig = require('./webpack/devConfig')
const getProdConfig = require('./webpack/prodConfig')

const getAppConfig = require('./lib/getAppConfig')

const Dev = require('./dev')
const Build = require('./build')

module.exports = async (config) => {
  const isDev = process.env.NODE_ENV === 'development'
  const APP_CONFIG = getAppConfig()
  const { scope: port, framework } = require(resolveProjectPath('package.json')).dm

  const options = {
    ...config,
    APP_CONFIG,
    framework,
    port
  }
  let mergedConfig = await (isDev ? getDevConfig(options) : getProdConfig(options))

  if (typeof APP_CONFIG.webpackConfig === 'function') {
    mergedConfig = APP_CONFIG.webpackConfig(mergedConfig)
  }

  if (isDev) {
    return Dev(mergedConfig, options)
  }

  return Build(mergedConfig, options)
}
