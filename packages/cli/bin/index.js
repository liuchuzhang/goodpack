#!/usr/bin/env node

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

require('../dist/index')