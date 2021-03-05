import webpack from 'webpack'
import rm from 'rimraf'
import path from 'path'
import { merge } from 'webpack-merge'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export default (webpackConfig, options) => {
  const { APP_CONFIG } = options

  if (options.analyzer) {
    webpackConfig = merge(webpackConfig, {
      plugins: [new BundleAnalyzerPlugin()],
    })
  }

  console.log('开始构建...')

  // 删除构建目录，重新构建项目
  rm(path.join(APP_CONFIG[process.env.NODE_ENV].assetsRoot), err => {
    if (err) {
      return console.log(err)
    }

    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return console.log(err)
      }

      if (stats.hasErrors()) {
        console.log('构建出现错误')
        return process.exit(1)
      }

      console.log()
      console.log('  构建完成')
      console.log()
    })
  })
}