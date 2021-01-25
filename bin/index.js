#!/usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const { version } = require('../package.json')

const currentNodeVersion = process.versions.node
const semver = currentNodeVersion.split('.')
const major = semver[0]

if (major < 10) {
  console.error(
    '你当前的 Node 版本为 ' +
      currentNodeVersion +
      '.\n' +
      '启动项目需要 Node 10 或以上. \n' +
      '请升级你的 Node 版本.'
  )
  process.exit(1)
}

program
  .version(version, '-v, --version')
  .usage('<command> [options]')

program
  .command('init')
  .alias('i')
  .description('初始化项目')
  .action(async () => {
    // TODO
    console.log('项目初始化')
  })

program
  .command('create')
  .alias('c')
  .description('创建组件或页面')
  .action(() => {
    // TODO
    console.log('创建组件或页面')
  })

program
  .command('dev')
  .description('本地开发项目')
  .action(async () => {
    try {
      process.env.NODE_ENV = 'development'

      require('./bundle')()
    } catch (error) {
      console.log('goodpack dev error', error)
    }
  })

program
  .command('build')
  .description('构建项目')
  .action(() => {
    process.env.NODE_ENV = 'production'

    require('./bundle')()
  })

program.arguments('<command>').action(cmd => {
  program.outputHelp()
  console.log(`  ${chalk.red(`未知命令 ${chalk.yellow(cmd)}`)}`)
  console.log()
})

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

