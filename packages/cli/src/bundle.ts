import getAppConfig from './lib/getAppConfig'

import Vite from './vite/index'
import Webpack from './webpack/index'

export default () => {
  const APP_CONFIG = getAppConfig()

  APP_CONFIG.bundler === 'webpack'
    ? Webpack(APP_CONFIG)
    : Vite(APP_CONFIG)
}
