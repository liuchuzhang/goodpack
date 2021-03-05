import getDevConfig from './devConfig'
import getProdConfig from './prodConfig'

import Dev from './dev'
import Build from './build'

export default async (APP_CONFIG) => {
  const isDev = process.env.NODE_ENV === 'development'
  const { port, framework } = APP_CONFIG

  const options = {
    APP_CONFIG,
    port,
    framework
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