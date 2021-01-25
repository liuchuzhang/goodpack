const path = require('path')
const chalk = require('chalk')
const fs = require('fs')

// 项目路径
const resolveProjectPath = (...p) => path.resolve(process.cwd(), ...p)

exports.resolveProjectPath = resolveProjectPath

exports.hasTsConfig = path => {
  const tsconfigPath = resolveProjectPath(path|| 'tsconfig.json')
  return fs.existsSync(tsconfigPath)
}

// friendly-errors-webpack-plugin 的格式解析
const rules = [
  {
    type: 'cant-resolve-loader',
    re: /Can't resolve '(.*loader)'/,
    msg: (e, match) => `Failed to resolve loader: ${chalk.yellow(match[1])}\nYou may need to install it.`,
  },
]

exports.transformer = error => {
  if (error.webpackError) {
    const message = typeof error.webpackError === 'string' ? error.webpackError : error.webpackError.message || ''
    // eslint-disable-next-line no-restricted-syntax
    for (const { re, msg, type } of rules) {
      const match = message.match(re)
      if (match) {
        return {
          ...error, // type is necessary to avoid being printed as defualt error
          // by friendly-error-webpack-plugin
          type,
          shortMessage: msg(error, match),
        }
      }
    }
    // no match, unknown webpack error without a message.
    // friendly-error-webpack-plugin fails to handle this.
    if (!error.message) {
      return {
        ...error,
        type: 'unknown-webpack-error',
        shortMessage: message,
      }
    }
  }
  return error
}

exports.formatter = errors => {
  errors = errors.filter(e => e.shortMessage)
  if (errors.length) {
    return errors.map(e => e.shortMessage)
  }
}