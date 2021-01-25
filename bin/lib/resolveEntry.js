const fs = require('fs')
const { resolveProjectPath } = require('./utils')

// main.(js|jsx|ts|tsx)
module.exports = () => {
  const supportEntrySuffixs = ['js', 'jsx', 'ts', 'tsx']
  for (const suffix of supportEntrySuffixs) {
    const path = resolveProjectPath(`src/main.${suffix}`)
    if (fs.existsSync(path)) {
      return path
    }
  }
}
