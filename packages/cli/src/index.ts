import chalk from 'chalk'
import program from 'commander'

program
  .version(require('../package.json').version, '-v, --version')
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
  .action(() => {
    process.env.NODE_ENV = 'development'

    require('./bundle')()
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

