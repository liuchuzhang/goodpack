const path = require('path')
const fs = require('fs')

module.exports = () => {
  const APP_CONFIG = {
    // 本地代理地址
    target: '',

    // 本地代理配置默认值，支持重写
    proxy: {
      '^/api': {
        target: this.target,
        changeOrigin: true,
      },
    },

    // html 的标题
    title: 'goodpack',

    // 自定义 webpack 配置
    webpackConfig: (webpackConfig) => webpackConfig,

    // 自定义 tsconConfig 路径，默认 tsconfig.json
    tsConfigPath: 'tsconfig.json',

    // 引用别名
    alias: {
      '@/components': './src/components',
      '@/utils': './src/utils'
    }
  }

  if (fs.existsSync('appConfig.js')) {
    Object.assign(APP_CONFIG, require(path.join(process.cwd(), 'appConfig.js')))
  }

  // 打包的出口目录
  const assetsRoot = APP_CONFIG.assetsRoot ? APP_CONFIG.assetsRoot.replace(/^\//, '') : 'dist'

  // 打包目录
  const plublicPath = '/'

  return {
    ...APP_CONFIG,
    development: {
      assetsPublicPath: '/',
      cssAssetsPath: '',
      assetsSubDirectory: './',
      productionSourceMap: false,
    },
    production: {
      assetsRoot: path.join(process.cwd(), assetsRoot),
      assetsPublicPath: plublicPath,
      cssAssetsPath: '',
      assetsSubDirectory: './',
      productionSourceMap: false,
    }
  }
}
